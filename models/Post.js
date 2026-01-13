const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  submittedBy: {
    type: String,
    required: true
  },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  admin: {
    incidentNumbers: {
      group: { type: String },
      battalion: { type: String },
      company: { type: String }
    },
    personnel: {
      teamLeader: { type: String },
      dutyOfficer: { type: String },
      teamMember1: { type: String },
      teamMember2: { type: String },
      teamMember3: { type: String }
    }
  },

  start: {
    startTime: { type: String },
    dateCallRecieved: { type: String },

    rank: { type: String },
    leoFirstName: { type: String },
    leoLastName: { type: String },
    leoCell: { type: String },

    itemDescription: { type: String },
    explosives: { type: String },

    departTime: { type: String },
    departDate: { type: String },
    truckDepartMiles: { type: String },

    image: { type: String },
    cloudinaryId: { type: String }
  },

  arrival: {
    arrivalTime: { type: String },
    arrivalDate: { type: String },
    onSceneSafeArea: { type: String },

    onSceneCommander: {
      rank: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
      officeNumber: { type: String },
      email: { type: String }
    },

    actualItems: { type: String },
    //itemGrid: { type: String },
    itemLat: { type: Number },
    itemLong: { type: Number },
    rspProcedures: { type: String }
  },

  departScene: {
    departSceneTime: { type: String },
    departSceneDate: { type: String },
    // departSceneGrid: { type: String }
    departSceneLat: { type: String },
    departSceneLong: { type: String }
  },

  detonation: {
    detonationTime: { type: String },
    detonationDate: { type: String },
    //detonationGrid: { type: String },
    detonationLat: { type: String },
    detonationLong: { type: String },
    disposalProcedures: { type: String },
    explosivesUsed: { type: String }
  },

  fiveWs: {
    who: { type: String },
    what: { type: String },
    where: { type: String },
    when: { type: String },
    why: { type: String }
  },

  missionComplete: {
    truckEndMiles: { type: String },
    mcTime: { type: String },
    mcDate: { type: String }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
