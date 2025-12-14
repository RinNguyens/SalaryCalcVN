import html2canvas from 'html2canvas';

/**
 * Capture a DOM element as a PNG image data URL
 * @param elementId - The ID of the element to capture
 * @returns Promise resolving to base64 image data URL
 */
export async function captureChartElement(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);

  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return '';
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher quality for PDF
      logging: false,
      useCORS: true,
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error(`Failed to capture chart element "${elementId}":`, error);
    return '';
  }
}

/**
 * Capture multiple chart elements
 * @param elementIds - Array of element IDs to capture
 * @returns Promise resolving to array of base64 image data URLs
 */
export async function captureMultipleCharts(
  elementIds: string[]
): Promise<string[]> {
  const promises = elementIds.map((id) => captureChartElement(id));
  return Promise.all(promises);
}

/**
 * Capture an element by reference (instead of ID)
 * @param element - The HTML element to capture
 * @returns Promise resolving to base64 image data URL
 */
export async function captureElementRef(
  element: HTMLElement
): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
    });

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Failed to capture element:', error);
    return '';
  }
}
