import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { Plus, Trash2, Save, Sparkles, Layout, Upload, Image as ImageIcon } from 'lucide-react';
import { AdBanner } from './AdBanner';

const resumeSchema = z.object({
  id: z.string().optional(),
  uid: z.string(),
  title: z.string().min(1, 'Title is required'),
  template: z.enum(['classic', 'modern', 'minimal', 'executive', 'fresher-india', 'two-column', 'premium', 'redline', 'navy', 'serif', 'tech-modern', 'business-classic', 'fresher-minimal', 'photo-sidebar', 'photo-circle', 'lawyer-classic', 'minimal-pro', 'pink-header', 'dark-navy', 'crimson']),
  personalInfo: z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
    location: z.string().min(1, 'Location is required'),
    summary: z.string().min(10, 'Summary should be at least 10 characters'),
    profileImage: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
  }),
  education: z.array(z.object({
    school: z.string().min(1, 'School is required'),
    degree: z.string().min(1, 'Degree is required'),
    year: z.string().min(1, 'Year is required'),
  })),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company is required'),
    position: z.string().min(1, 'Position is required'),
    duration: z.string().min(1, 'Duration is required'),
    description: z.string().min(1, 'Description is required'),
  })),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.number().min(0).max(100),
  })).min(1, 'At least one skill is required'),
  languages: z.array(z.object({
    name: z.string().min(1, 'Language name is required'),
    level: z.number().min(0).max(100),
  })),
  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    link: z.string().optional(),
  })),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

interface ResumeFormProps {
  initialData: ResumeData;
  onChange: (data: ResumeData) => void;
  onSave: (data: ResumeData) => void;
  isSaving: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onChange, onSave, isSaving }) => {
  const inputClass = "w-full px-3 py-2 md:py-2.5 min-h-[44px] md:min-h-0 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all";
  const labelClass = "text-sm font-semibold text-gray-600 mb-1 block";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue('personalInfo.profileImage', base64String);
    };
    reader.readAsDataURL(file);
  };

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: 'projects' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' });
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({ control, name: 'languages' });

  const watchedData = watch();
  const currentTemplate = watchedData.template;
  const lastSentData = React.useRef<string>(JSON.stringify(initialData));

  React.useEffect(() => {
    const dataStr = JSON.stringify(watchedData);
    if (dataStr !== lastSentData.current) {
      lastSentData.current = dataStr;
      onChange(watchedData);
    }
  }, [watchedData, onChange]);

  // Sync initialData changes (e.g. when loading dummy data or switching resumes)
  React.useEffect(() => {
    const dataStr = JSON.stringify(initialData);
    if (dataStr !== lastSentData.current) {
      lastSentData.current = dataStr;
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-sm py-4 z-10 border-b border-gray-100 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Resume Details</h2>
        <div className="flex items-center gap-4">
          <AdBanner adSlot="save-top" className="my-0 p-0 shadow-none bg-transparent" />
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 shrink-0"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
            Save Resume
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <div className="bg-indigo-100 p-1 rounded-md text-indigo-600"><Layout size={14} /></div> Choose Template
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(['classic', 'modern', 'minimal', 'executive', 'fresher-india', 'two-column', 'premium', 'redline', 'navy', 'serif', 'photo-sidebar', 'photo-circle', 'lawyer-classic', 'minimal-pro', 'pink-header'] as ResumeTemplate[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValue('template', t)}
              className={`px-3 py-2.5 rounded-xl border-2 transition-all capitalize font-medium text-xs ${
                currentTemplate === t 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      <AdBanner adSlot="form-top" className="my-6" />

      {/* Basic Info */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Resume Title</label>
            <input {...register('title')} className={inputClass} placeholder="e.g. Software Engineer Resume" />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Full Name</label>
            <input {...register('personalInfo.fullName')} className={inputClass} />
            {errors.personalInfo?.fullName && <p className="text-xs text-red-500">{errors.personalInfo.fullName.message}</p>}
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Email</label>
            <input {...register('personalInfo.email')} className={inputClass} />
            {errors.personalInfo?.email && <p className="text-xs text-red-500">{errors.personalInfo.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Phone</label>
            <input {...register('personalInfo.phone')} className={inputClass} />
            {errors.personalInfo?.phone && <p className="text-xs text-red-500">{errors.personalInfo.phone.message}</p>}
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className={labelClass}>Location</label>
            <input {...register('personalInfo.location')} className={inputClass} placeholder="e.g. Mumbai, India" />
            {errors.personalInfo?.location && <p className="text-xs text-red-500">{errors.personalInfo.location.message}</p>}
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className={labelClass}>Profile Photo</label>
            <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/30 hover:bg-gray-50/50 transition-all group relative">
              <div className="relative w-32 h-32">
                {/* Image Container */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-105">
                  {watchedData.personalInfo.profileImage ? (
                    <img 
                      src={watchedData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-50 flex flex-col items-center justify-center text-indigo-300">
                      <ImageIcon size={48} strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Hover Overlay (Change Photo) */}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-1 text-white">
                    <Upload size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Change Photo</span>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <div className="text-center space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Profile Picture</p>
                <p className="text-[10px] text-gray-400">JPG or PNG, max 2MB. Professional photos recommended.</p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>LinkedIn URL</label>
            <input {...register('personalInfo.linkedin')} className={inputClass} placeholder="linkedin.com/in/username" />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>GitHub URL</label>
            <input {...register('personalInfo.github')} className={inputClass} placeholder="github.com/username" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className={`${labelClass} flex items-center justify-between`}>
              Professional Summary
              <button 
                type="button" 
                onClick={() => {
                  const name = watchedData.personalInfo.fullName || 'a Fresher';
                  const skills = watchedData.skills?.map(s => s.name).join(', ') || 'various technologies';
                  const suggestion = `Dedicated and motivated ${name} with a strong foundation in ${skills}. Eager to leverage technical skills and problem-solving abilities to contribute to innovative projects and grow in a professional environment.`;
                  setValue('personalInfo.summary', suggestion);
                }}
                className="text-xs text-indigo-600 flex items-center gap-1 hover:underline"
              >
                <Sparkles size={12} /> AI Suggest
              </button>
            </label>
            <textarea {...register('personalInfo.summary')} rows={4} className={`${inputClass} resize-none`} />
            {errors.personalInfo?.summary && <p className="text-xs text-red-500">{errors.personalInfo.summary.message}</p>}
          </div>
        </div>
      </section>

      <AdBanner adSlot="form-middle" className="my-6" />

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded-full" />
            Education
          </h3>
          <button type="button" onClick={() => appendEdu({ school: '', degree: '', year: '' })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
            <Plus size={16} /> Add Education
          </button>
        </div>
        {eduFields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50 space-y-4 relative group">
            <button type="button" onClick={() => removeEdu(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register(`education.${index}.school`)} placeholder="School/University" className={inputClass} />
              <input {...register(`education.${index}.degree`)} placeholder="Degree" className={inputClass} />
              <input {...register(`education.${index}.year`)} placeholder="Year (e.g. 2020 - 2024)" className={inputClass} />
            </div>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded-full" />
            Experience
          </h3>
          <button type="button" onClick={() => appendExp({ company: '', position: '', duration: '', description: '' })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
            <Plus size={16} /> Add Experience
          </button>
        </div>
        {expFields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50 space-y-4 relative group">
            <button type="button" onClick={() => removeExp(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register(`experience.${index}.company`)} placeholder="Company" className={inputClass} />
              <input {...register(`experience.${index}.position`)} placeholder="Position" className={inputClass} />
              <input {...register(`experience.${index}.duration`)} placeholder="Duration" className={inputClass} />
              <textarea {...register(`experience.${index}.description`)} placeholder="Description" rows={3} className={`${inputClass} md:col-span-2 resize-none`} />
            </div>
          </div>
        ))}
      </section>

      <AdBanner adSlot="form-experience-bottom" className="my-6" />

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded-full" />
            Skills
          </h3>
          <button type="button" onClick={() => appendSkill({ name: '', level: 80 })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
            <Plus size={16} /> Add Skill
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillFields.map((field, index) => (
            <div key={field.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 flex flex-col gap-2 relative group">
              <button type="button" onClick={() => removeSkill(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
              <input {...register(`skills.${index}.name`)} placeholder="Skill Name" className="w-full px-2 py-1 bg-transparent border-b border-gray-200 outline-none text-sm" />
              <div className="flex items-center gap-3">
                <input type="range" {...register(`skills.${index}.level`, { valueAsNumber: true })} className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <span className="text-xs font-bold text-indigo-600 w-8">{watchedData.skills?.[index]?.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdBanner adSlot="form-skills-bottom" className="my-6" />

      {/* Languages */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded-full" />
            Languages
          </h3>
          <button type="button" onClick={() => appendLang({ name: '', level: 100 })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
            <Plus size={16} /> Add Language
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {langFields.map((field, index) => (
            <div key={field.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 flex flex-col gap-2 relative group">
              <button type="button" onClick={() => removeLang(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
              <input {...register(`languages.${index}.name`)} placeholder="Language Name" className="w-full px-2 py-1 bg-transparent border-b border-gray-200 outline-none text-sm" />
              <div className="flex items-center gap-3">
                <input type="range" {...register(`languages.${index}.level`, { valueAsNumber: true })} className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <span className="text-xs font-bold text-indigo-600 w-8">{watchedData.languages?.[index]?.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded-full" />
            Projects
          </h3>
          <button type="button" onClick={() => appendProj({ name: '', description: '', link: '' })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
            <Plus size={16} /> Add Project
          </button>
        </div>
        {projFields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/50 space-y-4 relative group">
            <button type="button" onClick={() => removeProj(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input {...register(`projects.${index}.name`)} placeholder="Project Name" className={inputClass} />
              <input {...register(`projects.${index}.link`)} placeholder="Link (Optional)" className={inputClass} />
              <textarea {...register(`projects.${index}.description`)} placeholder="Description" rows={2} className={`${inputClass} md:col-span-2 resize-none`} />
            </div>
          </div>
        ))}
      </section>
    </form>
  );
};
