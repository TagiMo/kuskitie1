
/**
 * Determine if an event date falls within a specified date range
 */
export const isEventInDateRange = (eventDate: Date, selectedDate: Date, rangeType: 'day' | 'week' | 'month'): boolean => {
  // Simple day comparison - same year, month, and day
  if (rangeType === 'day') {
    return eventDate.getFullYear() === selectedDate.getFullYear() &&
           eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getDate() === selectedDate.getDate();
  }
  
  // Week comparison
  if (rangeType === 'week') {
    // Create date range for the week (7 days from selected date)
    const weekEnd = new Date(selectedDate);
    weekEnd.setDate(selectedDate.getDate() + 6);
    
    return eventDate >= selectedDate && eventDate <= weekEnd;
  }
  
  // Month comparison
  if (rangeType === 'month') {
    // Create a new date for the first day of the next month
    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
    return eventDate >= monthStart && eventDate <= monthEnd;
  }
  
  return false;
};

/**
 * Calculate the end date and time of an event
 */
export const getEventEndDateTime = (dateString: string, endTimeString?: string, timeString?: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  // If endTime is available, use it directly
  if (endTimeString) {
    const [endHours, endMinutes] = endTimeString.split(':').map(Number);
    date.setHours(endHours, endMinutes);
    return date;
  }
  
  // If time contains a range like "10:00-12:00", use the end time
  if (timeString && timeString.includes('-')) {
    const endTime = timeString.split('-')[1].trim();
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    date.setHours(endHours, endMinutes);
    return date;
  }
  
  // If only start time is available, add 2 hours as a default duration
  if (timeString) {
    const [startHours, startMinutes] = timeString.split(':').map(Number);
    date.setHours(startHours + 2, startMinutes);
    return date;
  }
  
  // Default end time is end of day if no time info is available
  date.setHours(23, 59, 59);
  return date;
};

/**
 * Format date string for display in Finnish format
 */
export const parseFormattedDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
};
