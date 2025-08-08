import "./editor.scss";
import {
  useBlockProps,
  InspectorControls,
  useInnerBlocksProps
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  PanelRow,
  SelectControl
} from "@wordpress/components";
import {
  useMemo,
  useCallback,
  useReducer,
  useEffect
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import {
  ACTIONS,
  Reducer
} from "./reducer";
import { Display } from "./display";
import { Item } from "./item";

export default function Edit({ attributes, setAttributes, className, style }) {
  const { repeater = [], type = "default", image_loading = "lazy" } = attributes;
  const [state, dispatch] = useReducer(Reducer, { items: repeater });

  // Sync reducer state with WordPress attributes
  useEffect(() => {
    setAttributes({ repeater: state.items });
  }, [state.items, setAttributes]);

  // Action handlers
  const handleAddItem = useCallback(() => {
    dispatch({ type: ACTIONS.ADD, image_loading });
  }, [image_loading]);

  const handleRemoveItem = useCallback((index) => {
    dispatch({ type: ACTIONS.REMOVE, index });
  }, []);

  const handleTitleChange = useCallback((title, index) => {
    dispatch({ type: ACTIONS.UPDATE_TITLE, title, index });
  }, []);

  const handleTextChange = useCallback((text, index) => {
    dispatch({ type: ACTIONS.UPDATE_TEXT, text, index });
  }, []);

  const handleRemoveImage = useCallback((index) => {
    dispatch({ type: ACTIONS.REMOVE_IMAGE, index, image_loading });
  }, [image_loading]);

  const handleImageChange = useCallback((image, index) => {

    const isSVG = image.mime === 'image/svg+xml' ||
      image.subtype === 'svg+xml' ||
      image.url?.toLowerCase().endsWith('.svg');

    let srcset = '';
    let sizes = '';

    if (!isSVG) {
      // Generate srcset from image.sizes object
      if (image.sizes && typeof image.sizes === 'object') {
        const srcsetArray = [];

        // Add each size to srcset
        Object.keys(image.sizes).forEach(sizeKey => {
          const size = image.sizes[sizeKey];
          if (size.url && size.width) {
            srcsetArray.push(`${size.url} ${size.width}w`);
          }
        });

        // Add the full size image
        if (image.url && image.width) {
          srcsetArray.push(`${image.url} ${image.width}w`);
        }

        srcset = srcsetArray.join(', ');
      }

      sizes = image.width ? `(max-width: ${image.width}px) 100vw, ${image.width}px` : '100vw';
    }

    const processedImage = {
      ...image,
      srcset: srcset,
      sizes: sizes,
      loading: image_loading
    };

    dispatch({ type: ACTIONS.UPDATE_IMAGE, image: processedImage, index });
  }, [image_loading]);

  const handleMoveUp = useCallback((index) => {
    dispatch({ type: ACTIONS.MOVE_UP, index });
  }, []);

  const handleMoveDown = useCallback((index) => {
    dispatch({ type: ACTIONS.MOVE_DOWN, index });
  }, []);

  // Memoized components
  const repeaterFields = useMemo(() => {
    if (!state.items.length) return null;
    return state.items.map((item, index) => (
      <Item
        key={item.id}
        item={item}
        index={index}
        totalItems={state.items.length}
        onTitleChange={handleTitleChange}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onRemoveItem={handleRemoveItem}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
    ));
  }, [
    state.items,
    handleTitleChange,
    handleTextChange,
    handleImageChange,
    handleRemoveImage,
    handleRemoveItem,
    handleMoveUp,
    handleMoveDown
  ]);

  const repeaterDisplay = useMemo(() => {
    if (!state.items.length) return null;
    return state.items.map((item, index) => (
      <Display
        key={item.id}
        item={item}
        index={index}
        onTitleChange={handleTitleChange}
        onTextChange={handleTextChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
      />
    ));
  }, [
    state.items,
    handleTitleChange,
    handleTextChange,
    handleImageChange,
    handleRemoveImage
  ]);

  const innerBlockProps = useInnerBlocksProps(
    { className: "repeater__head" },
    {
      allowedBlocks: ["core/heading", "core/paragraph", "vit/editor"],
      template: [
        [
          "core/heading",
          { level: 2, placeholder: "Enter a title..." }
        ],
        [
          "vit/editor",
          {},
          [
            ["core/paragraph", { placeholder: "Enter a paragraph..." }]
          ]
        ]
      ]
    }
  );

  const blockProps = useBlockProps({
    className: clsx(className, {
      [`repeater repeater--${type}`]: type,
    }),
    style,
  });

  return (
    <>
      <InspectorControls group="styles">
        <PanelBody title={__("Settings")}>
          <PanelRow>Type</PanelRow>
          <SelectControl
            onChange={(val) => setAttributes({ type: val })}
            value={type}
            options={[
              { label: "Default", value: "default" },
              { label: "Alternative", value: "alt" }
            ]}
          />
          <PanelRow>Image Loading</PanelRow>
          <SelectControl
            onChange={(val) => setAttributes({ image_loading: val })}
            value={image_loading}
            options={[
              { label: "Lazy", value: "lazy" },
              { label: "Eager", value: "eager" }
            ]}
          />
        </PanelBody>
      </InspectorControls>

      <InspectorControls>
        <PanelBody title={__("Items")}>
          {repeaterFields}
          <Button variant="primary" onClick={handleAddItem}>
            {__("Add Item")}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div {...innerBlockProps} />

        {repeaterDisplay && (
          <div className="repeater__cont">{repeaterDisplay}</div>
        )}
      </div>
    </>
  );
}
