import { domReady } from '@wordpress/dom-ready';
import editor from './editor';

domReady(() => {
    // Initialize editor functionality
    const { ICONS, supportedBlocks, withInspectorControls, addCustomAttributes } = editor;
    
    // The filters are already registered in editor.js
    // This is just to ensure the code runs when the DOM is ready
});
