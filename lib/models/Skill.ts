import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a skill name'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon for the skill'],
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);