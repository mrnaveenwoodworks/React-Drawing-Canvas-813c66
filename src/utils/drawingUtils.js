// Drawing state constants
export const TOOL_TYPES = {
    PENCIL: "PENCIL",
    ERASER: "ERASER",
    LINE: "LINE",
    RECTANGLE: "RECTANGLE",
    CIRCLE: "CIRCLE"
};

// Initialize canvas context with default settings
// Modified to not clear existing content
export const initializeCanvas = (context, color = "#000000", lineWidth = 2) => {
    if (!context) return;
    
    // Only update context properties, don't clear or reset canvas
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
};

// Start drawing path
export const startDrawing = (context, x, y) => {
    if (!context) return;
    
    context.beginPath();
    context.moveTo(x, y);
};

// Draw with pencil or eraser
export const draw = (context, x, y, isEraser = false) => {
    if (!context) return;
    
    if (isEraser) {
        context.globalCompositeOperation = "destination-out";
    } else {
        context.globalCompositeOperation = "source-over";
    }
    
    context.lineTo(x, y);
    context.stroke();
};

// Draw shapes
export const drawShape = (context, startX, startY, endX, endY, tool, color) => {
    if (!context) return;

    // Save current context state
    context.save();
    
    // Apply the shape-specific color without affecting other drawings
    context.strokeStyle = color;
    context.beginPath();

    switch (tool) {
        case TOOL_TYPES.LINE:
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            break;

        case TOOL_TYPES.RECTANGLE:
            const width = endX - startX;
            const height = endY - startY;
            context.rect(startX, startY, width, height);
            break;

        case TOOL_TYPES.CIRCLE:
            const radius = Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
            );
            context.arc(startX, startY, radius, 0, 2 * Math.PI);
            break;

        default:
            break;
    }

    context.stroke();
    
    // Restore previous context state
    context.restore();
};

// Clear canvas
export const clearCanvas = (canvas, context) => {
    if (!context || !canvas) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
};

// Get mouse/touch position relative to canvas
export const getCoordinates = (event, canvas) => {
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = event.clientX || (event.touches && event.touches[0].clientX);
    const clientY = event.clientY || (event.touches && event.touches[0].clientY);

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
};

// Resize canvas preserving content
export const resizeCanvas = (canvas, context) => {
    if (!canvas || !context) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        // Save the current image data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Update canvas dimensions
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        
        // Restore the image data
        context.putImageData(imageData, 0, 0);
        
        // Reapply styles (without clearing)
        context.lineCap = "round";
        context.lineJoin = "round";
    }
};

// Save canvas state
export const saveCanvasState = (canvas) => {
    if (!canvas) return null;
    return canvas.toDataURL();
};

// Load canvas state
export const loadCanvasState = (canvas, context, dataUrl) => {
    if (!canvas || !context || !dataUrl) return;

    const image = new Image();
    image.onload = () => {
        // Save current context settings
        const strokeStyle = context.strokeStyle;
        const lineWidth = context.lineWidth;
        const lineCap = context.lineCap;
        const lineJoin = context.lineJoin;
        
        // Clear and draw new image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        
        // Restore context settings
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        context.lineJoin = lineJoin;
    };
    image.src = dataUrl;
};

// Update drawing properties without resetting canvas
export const updateDrawingProperties = (context, color, lineWidth) => {
    if (!context) return;
    
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
};