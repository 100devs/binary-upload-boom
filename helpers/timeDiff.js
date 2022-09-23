function dayDiff(createdAt) {
  const currentDate = new Date();
  const Difference_In_Time = currentDate - createdAt;
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
}

function hourDiff(createdAt) {
  const currentDate = new Date();
  const Difference_In_Time = currentDate - createdAt;
  let diff = Difference_In_Time / 1000;
  diff /= 60 * 60;
  return diff;
}

function postDiff(createdAt) {
  const Difference_In_Days = dayDiff(createdAt);
  if (Difference_In_Days < 1) {
    const diff = hourDiff(createdAt);
    return `${Math.abs(Math.round(diff))} HOURS AGO`;
  } else {
    return `${Math.trunc(Difference_In_Days)} DAYS AGO`;
  }
}

function commentDiff(createdAt) {
  const Difference_In_Days = dayDiff(createdAt);
  if (Difference_In_Days < 1) {
    const diff = hourDiff(createdAt);
    return `${Math.abs(Math.round(diff))}H`;
  } else {
    return `${Math.trunc(Difference_In_Days)}D`;
  }
}

module.exports = {
  commentDiff: commentDiff,
  postDiff: postDiff,
};
