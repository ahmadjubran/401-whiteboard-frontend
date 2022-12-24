export const canDo = (cap, id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.capabilities.includes(cap)) {
    return true;
  }

  if (id === Number(user && user.id)) {
    return true;
  }
  return false;
};

export const showTime = (time) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (seconds < 60) {
    return "just now";
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  if (days < 30) {
    return `${days} days ago`;
  }
  if (months < 12) {
    return `${months} months ago`;
  }
  return `${years} years ago`;
};

export const handleWidth = (width) => {
  if (width < 768) {
    return "90vw";
  } else if (width < 992) {
    return "75vw";
  } else if (width < 1280) {
    return "60vw";
  } else {
    return "50vw";
  }
};
