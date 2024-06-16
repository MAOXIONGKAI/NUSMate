// Build Database query from the input tags provided by frontend
const buildQuery = (tags) => {
  // Conditions to form query body
  const conditions = [];

  for (const tag in tags) {
    if (tag === "searcherID") {
      continue;
    }
    if (tags[tag]) {
      if (Array.isArray(tags[tag])) {
        const arr = tags[tag];
        for (const elem of arr) {
          conditions.push({ [tag]: { $regex: elem, $options: "i" } });
        }
      } else {
        conditions.push({ [tag]: { $regex: tags[tag], $options: "i" } });
      }
    }
  }

  // Predicates to test to calculate relevance score for sorting of results
  const {
    username,
    first_major,
    second_major,
    education_status,
    nationality,
    location,
    personality,
    interests,
  } = tags;

  const predicates = [
    { $cond: [{ $in: ["$username", [username]] }, 100, 0] },
    { $cond: [{ $in: ["$first_major", [first_major]] }, 5, 0] },
    { $cond: [{ $in: ["$second_major", [second_major]] }, 3, 0] },
    { $cond: [{ $in: ["$education_status", [education_status]] }, 1, 0] },
    { $cond: [{ $in: ["$nationality", [nationality]] }, 5, 0] },
    { $cond: [{ $in: ["$location", [location]] }, 5, 0] },
    { $cond: [{ $in: ["$personality", [personality]] }, 5, 0] },
    { $multiply: [{$size: { $setIntersection: [interests, "$interests"] } }, 5]}
  ];

  const pipeline = [
    {
      $match: {
        $or: conditions,
      },
    },
    {
      $addFields: {
        relevanceScore: {
          $sum: predicates
        }
      }
    },
    {
      $sort: {
        relevanceScore: -1
      }
    }
  ];
  return pipeline;
};

module.exports = buildQuery;
