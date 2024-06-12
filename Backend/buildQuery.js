// Build Database query from the input tags provided by frontend
const buildQuery = (tags) => {
    const conditions = [];

    for (const tag in tags) {
        if (tags[tag]) {
            conditions.push({[tag]: tags[tag]})
        }
    }

    return { $or: conditions };
}

module.exports = buildQuery;