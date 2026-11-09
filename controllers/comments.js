const Comment = require("../models/Comment");

// Collect a comment's id plus the ids of every reply beneath it (any depth)
const collectThreadIds = async (rootId) => {
  const ids = [rootId];
  let frontier = [rootId];

  while (frontier.length) {
    const children = await Comment.find({ parentComment: { $in: frontier } })
      .select("_id")
      .lean();
    frontier = children.map((child) => child._id);
    ids.push(...frontier);
  }
  return ids;
};

// Like and dislike share the same toggle logic, so build both from one helper
const toggleReaction = (field, opposite) => async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.redirect("back");

    const userId = req.user.id;
    const alreadyReacted = comment[field].some((id) => id.equals(userId));

    if (alreadyReacted) {
      // Clicking again removes your reaction
      comment[field].pull(userId);
    } else {
      // Add the reaction and clear the opposite one (can't like AND dislike)
      comment[field].addToSet(userId);
      comment[opposite].pull(userId);
    }

    await comment.save();
    res.redirect(`/post/${comment.post}#comment-${comment._id}`);
  } catch (err) {
    console.error(err);
    res.redirect("back");
  }
};

module.exports = {
  createComment: async (req, res) => {
    try {
      const text = (req.body.text || "").trim();
      if (!text) return res.redirect(`/post/${req.params.postId}`);

      const comment = await Comment.create({
        text,
        post: req.params.postId,
        user: req.user.id,
      });
      res.redirect(`/post/${req.params.postId}#comment-${comment._id}`);
    } catch (err) {
      console.error(err);
      res.redirect(`/post/${req.params.postId}`);
    }
  },

  createReply: async (req, res) => {
    try {
      const parent = await Comment.findById(req.params.commentId);
      if (!parent) return res.redirect("back");

      const text = (req.body.text || "").trim();
      if (!text)
        return res.redirect(`/post/${parent.post}#comment-${parent._id}`);

      const reply = await Comment.create({
        text,
        post: parent.post,
        user: req.user.id,
        parentComment: parent._id,
      });
      res.redirect(`/post/${parent.post}#comment-${reply._id}`);
    } catch (err) {
      console.error(err);
      res.redirect("back");
    }
  },

  likeComment: toggleReaction("likes", "dislikes"),
  dislikeComment: toggleReaction("dislikes", "likes"),

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) return res.redirect("back");

      // Only the author can delete their comment
      if (!comment.user.equals(req.user.id)) {
        return res.redirect(`/post/${comment.post}`);
      }

      // Remove the comment and all replies under it
      const ids = await collectThreadIds(comment._id);
      await Comment.deleteMany({ _id: { $in: ids } });

      res.redirect(`/post/${comment.post}#comments`);
    } catch (err) {
      console.error(err);
      res.redirect("back");
    }
  },
};
