import { MediaPlaceholder } from "@wordpress/block-editor";
import { Icon, trash, arrowUp, arrowDown, close } from "@wordpress/icons";
import {
  Button,
  TextareaControl,
  TextControl,
  __experimentalDivider as Divider,
  PanelRow,
  Flex,
  FlexItem
} from "@wordpress/components";

export const Item = ({
  item,
  index,
  totalItems,
  onTitleChange,
  onTextChange,
  onImageChange,
  onRemoveImage,
  onRemoveItem,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="repeater-item-wrapper">
      <div className="repeater-item-header">
        <Flex justify="space-between" align="center">
          <FlexItem>
            <span className="repeater-item-number">Item {index + 1}</span>
          </FlexItem>
          <FlexItem>
            <Flex gap={1}>
              <Button
                icon={arrowUp}
                size="small"
                disabled={index === 0}
                onClick={() => onMoveUp(index)}
                label="Move up"
              />
              <Button
                icon={arrowDown}
                size="small"
                disabled={index === totalItems - 1}
                onClick={() => onMoveDown(index)}
                label="Move down"
              />
              <Button
                icon={close}
                size="small"
                onClick={() => onRemoveItem(index)}
                label="Delete item"
                isDestructive
              />
            </Flex>
          </FlexItem>
        </Flex>
      </div>

      <div className="repeater-item-content">
        <PanelRow>Title</PanelRow>
        <TextControl
          placeholder="add item title"
          value={item.title}
          onChange={(title) => onTitleChange(title, index)}
          __next40pxDefaultSize
        />

        <PanelRow>Text</PanelRow>
        <TextareaControl
          placeholder={"Add item text…"}
          value={item.text}
          onChange={(text) => onTextChange(text, index)}
          __next40pxDefaultSize
        />

        <PanelRow>Image</PanelRow>
        {item.image_url && item.image_id ? (
          <div className="image-container">
            <img
              src={item.image_url}
              alt={item.image_alt}
              className={`wp-image-${item.image_id}`}
              {...(item.image_srcset && { srcSet: item.image_srcset })}
              {...(item.image_sizes && { sizes: item.image_sizes })}
              {...(item.image_width && { width: item.image_width })}
              {...(item.image_height && { height: item.image_height })}
              loading={item.image_loading}
              decoding="async"
            />
            <Button
              className="remove-image-button"
              icon={trash}
              size="32"
              onClick={() => onRemoveImage(index)}
              label="Remove image"
              isDestructive
            />
          </div>
        ) : (
          <MediaPlaceholder
            onSelect={(image) => onImageChange(image, index)}
            allowedTypes={["image"]}
            multiple={false}
            labels={{ title: "Image" }}
          />
        )}

        <Divider/>
      </div>
    </div>
  );
};
