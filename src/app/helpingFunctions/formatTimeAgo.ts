// Import necessary modules if needed

export const formatTimeAgo = (dateString: string): string => {
  const currentDate = new Date();
  const pastDate = new Date(dateString);
  
  // Calculate the difference in milliseconds
  const timeDifference = currentDate.getTime() - pastDate.getTime();

  // Convert milliseconds to minutes
  const minutesAgo = Math.round(timeDifference / (1000 * 60));

  // Format the result based on the time elapsed
  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  } else if (minutesAgo < 24 * 60) {
    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo} hours ago`;
  } else {
    // You can add more logic here for longer durations if needed
    return pastDate.toLocaleString(); // or any other default format
  }
};
