// Build Database query from the input tags provided by frontend
const buildQuery = (tags) => {
  const conditions = [];

  for (const tag in tags) {
    if (tag === "_id") continue;
    if (tags[tag]) {
      if (Array.isArray(tags[tag])) {
        const arr = tags[tag];
        for (const elem of arr) {
          conditions.push({ [tag]: { $regex: elem, $options: "i" } });
        }
      } else {
        conditions.push({ [tag]: tags[tag] });
      }
    }
  }
  return {_id: {$ne: tags["_id"]}, $or: conditions };
};

module.exports = buildQuery;
