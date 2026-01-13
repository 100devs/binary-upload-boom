const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user });
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: user });
    } catch (err) {
      console.log(err);
    }
  }, 

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        submittedBy: req.user,
        user: req.user.id,

        admin: {
          incidentNumbers: {
            group: req.body.group,
            battalion: req.body.battalion,
            company: req.body.company
          },
          personnel: {
            teamLeader: req.body.teamLeader,
            dutyOfficer: req.body.dutyOfficer,
            teamMember1: req.body.teamMember1,
            teamMember2: req.body.teamMember2,
            teamMember3: req.body.teamMember3
          }
        },

        start: {
          startTime: req.body.startTime,
          dateCallRecieved: req.body.dateCallRecieved,

          rank: req.body.rank,
          leoFirstName: req.body.leoFirstName,
          leoLastName: req.body.leoLastName,
          leoCell: req.body.leoCell,

          itemDescription: req.body.itemDescription,
          explosives: req.body.explosives,

          departTime: req.body.departTime,
          departDate: req.body.departDate,
          truckDepartMiles: req.body.truckDepartMiles,

          image: result.secure_url,
          cloudinaryId: result.public_id
        },


        arrival: {
          arrivalTime: req.body.arrivalTime,
          arrivalDate: req.body.arrivalDate,
          // onSceneSafeArea: req.body.onSceneSafeArea,
          onSceneLat: req.body.onSceneLat,
          onSceneLong: req.body.onSceneLong,


          onSceneCommander: {
            rank: req.body.oscRank,
            firstName: req.body.oscFirstName,
            lastName: req.body.oscLastName,
            phoneNumber: req.body.oscPhoneNumber,
            officeNumber: req.body.oscOfficeNumber,
            email: req.body.oscEmail
          },

          actualItems: req.body.actualItems,
          // itemGrid: req.body.itemGrid,
          itemLat: req.body.itemLat,
          itemLong: req.body.itemLong,
          rspProcedures: req.body.rspProcedures
        },

        departScene: {
          departSceneTime: req.body.departSceneTime,
          departSceneDate: req.body.departSceneDate,
          // departSceneGrid: req.body.departSceneGrid
          detonationLat: req.body.detonationLat,
          detonationLong: req.body.detonationLong
        },

        detonation: {
          detonationTime: req.body.detonationTime,
          detonationDate: req.body.detonationDate,
          detonationGrid: req.body.detonationGrid,
          disposalProcedures: req.body.disposalProcedures,
          explosivesUsed: req.body.explosivesUsed
        },

        fiveWs: {
          who: req.body.who,
          what: req.body.what,
          where: req.body.where,
          when: req.body.when,
          why: req.body.why
        },

        missionComplete: {
          truckEndMiles: req.body.truckEndMiles,
          mcTime: req.body.mcTime,
          mcDate: req.body.mcDate
        },

        // createdAt is prefilled by date.now in schema
      });
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 } }
      );
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({ _id: req.params.id });

      await cloudinary.uploader.destroy(post.start.cloudinaryId, { invalidate: true });

      await Post.findOneAndDelete({ _id: req.params.id });

      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  }
};
