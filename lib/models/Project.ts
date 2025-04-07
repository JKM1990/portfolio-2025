import mongoose from 'mongoose';

const TechnologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a technology name'],
    trim: true,
  },
});

const ProjectDetailsSchema = new mongoose.Schema({
  problem: {
    type: String,
    trim: true,
  },
  solution: {
    type: String,
    trim: true,
  },
  challenges: {
    type: [String],
    default: [],
  },
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
    required: true,
  },
  imageSrc: {
    type: String,
    trim: true,
  },
  technologies: {
    type: [TechnologySchema],
    default: [],
  },
  githubLink: {
    type: String,
    trim: true,
  },
  liveLink: {
    type: String,
    trim: true,
  },
  details: {
    type: ProjectDetailsSchema,
    default: {},
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);