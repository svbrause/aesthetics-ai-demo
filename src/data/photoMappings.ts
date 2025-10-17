// Complete photo mappings based on all Airtable Photos data
// This maps treatments and issues to relevant photos using local photos
// Generated automatically from airtablePhotoMappings.json

export interface PhotoMapping {
  photo: string;
  issues: string[];
  treatment: string;
  treatmentCardTitle: string; // Added: The actual treatment card title shown in UI
  storyTitle?: string;
  storyDetailed?: string;
  source?: string;
  name?: string;
}

// Complete photo mappings using all local photos from airtable-photos directory
// Names match exactly with the Airtable Photos "Name" column
export const photoMappings: PhotoMapping[] = [
  // Contour Submentum with Heat/Energy
  {
    photo: "/airtable-photos/emface-submental-results6.jpg",
    issues: ["Excess/Submental", "Fullness Obtuse", "Cervicomental", "Angle"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle:
      "How I Redefined My Jawline with Emface—No Needles, No Downtime",
    storyDetailed:
      "For years, this patient felt self-conscious about the fullness under her chin and the gradual softening of her jawline. She wanted a natural-looking lift—something subtle yet effective, without the invasiveness of surgery or fillers. With a series of Emface treatments targeting her cheeks and submental area, she achieved a more sculpted, youthful contour. Just one month after her fourth session, her jawline appears firmer, her profile more defined, and her confidence revitalized—all without a single injection.",
    source: "",
    name: "Contour Submentum with Heat/Energy",
  },

  // Contour Submentum with Liposuction
  {
    photo:
      "/airtable-photos/neck-liposuction-chin-liposuction--55-view-1-detail.webp",
    issues: ["Excess/Submental", "Fullness Obtuse", "Cervicomental", "Angle"],
    treatment: "Liposuction",
    treatmentCardTitle: "Liposuction",
    storyTitle:
      "Sleek and Sculpted: How I Transformed My Jawline with Chin Liposuction",
    storyDetailed:
      "A fuller jawline and excess volume under the chin made this patient feel like her profile lacked definition. She wanted a sharper, more contoured look that highlighted her natural bone structure. With a quick and effective chin liposuction procedure, she achieved a dramatic yet natural enhancement. Now, her jawline is sleek, her neck is refined, and her confidence shines—proof that a small change can make a big impact.",
    source:
      "https://www.drsterry.com/photo-gallery/face/neck-liposuction-chin-liposuction-/55/",
    name: "Contour Submentum with Liposuction",
  },

  // Contour Submentum with Liposuction
  {
    photo:
      "/airtable-photos/neck-liposuction-chin-liposuction--55-view-2-detail.webp",
    issues: ["Excess/Submental", "Fullness Obtuse", "Cervicomental", "Angle"],
    treatment: "Liposuction",
    treatmentCardTitle: "Liposuction",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drsterry.com/photo-gallery/face/neck-liposuction-chin-liposuction-/55/",
    name: "Contour Submentum with Liposuction",
  },

  // Contour Submentum with Liposuction
  {
    photo:
      "/airtable-photos/neck-liposuction-chin-liposuction--55-view-3-detail.webp",
    issues: ["Excess/Submental", "Fullness Obtuse", "Cervicomental", "Angle"],
    treatment: "Liposuction",
    treatmentCardTitle: "Liposuction",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drsterry.com/photo-gallery/face/neck-liposuction-chin-liposuction-/55/",
    name: "Contour Submentum with Liposuction",
  },

  // Contour Submentum with Liposuction
  {
    photo:
      "/airtable-photos/Nelson-Alexis-20051113132556238-200701170849382541.jpg",
    issues: ["Excess/Submental", "Fullness Obtuse", "Cervicomental", "Angle"],
    treatment: "Liposuction",
    treatmentCardTitle: "Liposuction",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Contour Submentum with Liposuction",
  },

  // Diminish Red Spots with Oral/Topical
  {
    photo: "/airtable-photos/Diminish_Red_Spots_with_TopicalSkincare.jpg",
    issues: ["Acne"],
    treatment: "Topical/Skincare",
    treatmentCardTitle: "Skincare",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Diminish Red Spots with Oral/Topical",
  },

  // Fade Dark Spots with Chemical Peel
  {
    photo: "/airtable-photos/Fade_Dark_Spots_with_Chemical_Peel.jpg",
    issues: ["Dark", "Spots"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Fade Dark Spots with Chemical Peel",
  },

  // Fade Dark Spots with Heat/Energy
  {
    photo: "/airtable-photos/great-skin-fmpt30s1_720x445_rej.jpg",
    issues: ["Dark", "Spots"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Fade Dark Spots with Heat/Energy",
  },

  // Fade Dark Spots with Topical/Skincare
  {
    photo: "/airtable-photos/fade dark spots skincare copy.jpg",
    issues: ["Dark", "Spots"],
    treatment: "Topical/Skincare",
    treatmentCardTitle: "Skincare",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reddit.com/r/30PlusSkinCare/comments/16lfu4s/3_week_progress_update_tret_005_hydroquinone_4/",
    name: "Fade Dark Spots with Topical/Skincare",
  },

  // Smooth Smile Lines with Fat Grafting
  {
    photo: "/airtable-photos/r-45-90.jpg",
    issues: ["Nasolabial Folds", "Marionette", "Lines Jowls"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Smooth Smile Lines with Fat Grafting",
  },

  // Smooth Nasolabial Lines with Filler
  {
    photo:
      "/airtable-photos/60771cccdc26ba3699c13253_DrK_FaceContouring_Nasolabial_Fold_Case2_RO_prepost.jpg",
    issues: ["Nasolabial Folds"],
    treatment: "Filler",
    treatmentCardTitle: "Nasolabial Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Smooth Nasolabial Lines with Filler",
  },

  // Smooth Nasolabial Lines with Heat/Energy
  {
    photo: "/airtable-photos/Labialfolds.jpg",
    issues: ["Nasolabial Folds"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Smooth Nasolabial Lines with Heat/Energy",
  },

  // Lighten Dark Circles with Chemical Peel
  {
    photo: "/airtable-photos/chemical peel dark circles.jpg",
    issues: ["Under", "Eye", "Dark", "Circles"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://skyskinclinic.in/brighten-your-eyes-exploring-the-effectiveness-of-chemical-peels-for-dark-circles/",
    name: "Lighten Dark Circles with Chemical Peel",
  },

  // Lighten Dark Circles with Heat/Energy
  {
    photo: "/airtable-photos/dark circles lasers.webp",
    issues: ["Under", "Eye", "Dark", "Circles"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Lighten Dark Circles with Heat/Energy",
  },

  // Lighten Dark Circles with Topical/Skincare
  {
    photo: "/airtable-photos/dark circle topical .webp",
    issues: ["Under", "Eye", "Dark", "Circles"],
    treatment: "Topical/Skincare",
    treatmentCardTitle: "Skincare",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.usmagazine.com/shop-with-us/news/goldfaden-md-arnica-dark-circle-eye-cream-amazon-beauty/",
    name: "Lighten Dark Circles with Topical/Skincare",
  },

  // Resolve Asymmetric Lips with Filler
  {
    photo: "/airtable-photos/lip asymm with filler.jpg",
    issues: ["Asymmetric", "Lips"],
    treatment: "Filler",
    treatmentCardTitle: "Lip Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://europepmc.org/articles/PMC5782440/bin/JCAS-10-153-g003.jpg",
    name: "Resolve Asymmetric Lips with Filler",
  },

  // Resolve Asymmetric Lips with Lip Lift
  {
    photo: "/airtable-photos/lip lift asymm lips.webp",
    issues: ["Asymmetric", "Lips"],
    treatment: "Lip Lift",
    treatmentCardTitle: "Lip Lift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F3-months-post-lip-lift-surgery-v0-5ri07ws1xf0b1.jpg%3Fwidth%3D2048%26format%3Dpjpg%26auto%3Dwebp%26s%3D15f73d41a8b1643551fd22c2f9ac08f6c8919f1c",
    name: "Resolve Asymmetric Lips with Lip Lift",
  },

  // Resolve Asymmetric Lips with Neurotoxin
  {
    photo: "/airtable-photos/lip asymm tox.webp",
    issues: ["Asymmetric", "Lips"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Lip Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://fi.realself.com/545/7d173fdc819f6f3ef706e2d1513548dd/1/d/b/userimage-2333202.PNG",
    name: "Resolve Asymmetric Lips with Neurotoxin",
  },

  // Resolve Brow Asymmetry with Browlift
  {
    photo: "/airtable-photos/brow lift asymm.jpg",
    issues: ["Brow Asymmetry"],
    treatment: "Brow Lift",
    treatmentCardTitle: "Brow Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://my.clevelandclinic.org/health/treatments/10784-brow-lift",
    name: "Resolve Brow Asymmetry with Browlift",
  },

  // Resolve Brow Asymmetry with Filler
  {
    photo: "/airtable-photos/browlift fillers.jpg",
    issues: ["Brow Asymmetry"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://themanseclinic.com.au/treatment/eyebrow-lifting/",
    name: "Resolve Brow Asymmetry with Filler",
  },

  // Resolve Brow Asymmetry with Neurotoxin
  {
    photo: "/airtable-photos/browlift asymm tox.jpg",
    issues: ["Brow Asymmetry"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Botox Forehead",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://carolinafacialplasticsurgery.com/how-long-does-a-browlift-last/",
    name: "Resolve Brow Asymmetry with Neurotoxin",
  },

  // Resolve Brow Asymmetry with Threadlift
  {
    photo: "/airtable-photos/Resolve_Brow_Asymmetry_with_Threadlift...jpg",
    issues: ["Brow Asymmetry"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Brow Asymmetry with Threadlift",
  },

  // Resolve Brow Asymmetry with Threadlift
  {
    photo: "/airtable-photos/brow threadlift.jpg",
    issues: ["Brow Asymmetry"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.clinicbe.com/wp-content/uploads/2019/09/Before-After-PDO-Eyebrow-Thread-Lift-Hooded-Eyes.jpg",
    name: "Resolve Brow Asymmetry with Threadlift",
  },

  // Resolve Brow Ptosis with Browlift
  {
    photo: "/airtable-photos/brow ptosis browlift.jpg",
    issues: ["Brow Ptosis"],
    treatment: "Brow Lift",
    treatmentCardTitle: "Brow Lift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.malenaamatomd.com/wp-content/uploads/2019/03/amato-endoscopic-brow-lift-patient-768x500.jpg",
    name: "Resolve Brow Ptosis with Browlift",
  },

  // Resolve Brow Ptosis with Filler
  {
    photo: "/airtable-photos/filler brow asymm.webp",
    issues: ["Brow Ptosis"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.lovethatface.com/2014/09/19/non-surgical-brow-lift-with-fillers-and-botox/",
    name: "Resolve Brow Ptosis with Filler",
  },

  // Resolve Brow Ptosis with Heat/Energy
  {
    photo: "/airtable-photos/laser skin resurfacing tightening.jpg",
    issues: ["Brow Ptosis"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "https://mccrackenmd.com/photo-gallery/laser-skin-resurfacing/",
    name: "Resolve Brow Ptosis with Heat/Energy",
  },

  // Resolve Brow Ptosis with Microneedling
  {
    photo: "/airtable-photos/Resolve_Brow_Asymmetry_with_microneedling.jpg",
    issues: ["Brow Ptosis"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Brow Ptosis with Microneedling",
  },

  // Resolve Cheekbone - Not Prominent with Fat Grafting
  {
    photo: "/airtable-photos/fat transfer face.jpeg",
    issues: ["Cheekbone Not", "Prominent"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://carolinafacialplasticsurgery.com/wp-content/uploads/2020/08/Chin-implant-facial-fat-grafting-Kulbersh-Carolina-3.jpeg",
    name: "Resolve Cheekbone - Not Prominent with Fat Grafting",
  },

  // Resolve Cheekbone - Not Prominent with Filler
  {
    photo: "/airtable-photos/fill face balancing.jpg",
    issues: ["Cheekbone Not", "Prominent"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.nofilterclinic.com/treatments/full-face-balancing",
    name: "Resolve Cheekbone - Not Prominent with Filler",
  },

  // Resolve Crooked Nose with Liquid Rhinoplasty
  {
    photo: "/airtable-photos/before-after-non-surgicalliquid-rhynoplasty.webp",
    issues: ["Crooked", "Nose"],
    treatment: "Liquid Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Crooked Nose with Liquid Rhinoplasty",
  },

  // Resolve Crooked Nose with Rhinoplasty
  {
    photo: "/airtable-photos/straight nose rhino.jpg",
    issues: ["Crooked", "Nose"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.seattlefacial.com/crooked-nasal-bones",
    name: "Resolve Crooked Nose with Rhinoplasty",
  },

  // Resolve Dorsal Hump with Liquid Rhinoplasty
  {
    photo: "/airtable-photos/Resolve_Dorsal_Hump_with_Liquid_Rhinoplasty.jpg",
    issues: ["Dorsal Hump"],
    treatment: "Liquid Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Dorsal Hump with Liquid Rhinoplasty",
  },

  // Resolve Dorsal Hump with Rhinoplasty
  {
    photo: "/airtable-photos/8A1BD513-128F-430A-B660-D3AB62FE911C.JPG",
    issues: ["Dorsal Hump"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "pt of Dr. J",
    name: "Resolve Dorsal Hump with Rhinoplasty",
  },

  // Resolve Droopy Tip with Liquid Rhinoplasty
  {
    photo: "/airtable-photos/Resolve_Droopy_Tip_with_Liquid_Rhinoplasty.jpg",
    issues: ["Droopy Tip"],
    treatment: "Liquid Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Droopy Tip with Liquid Rhinoplasty",
  },

  // Resolve Droopy Tip with Rhinoplasty
  {
    photo: "/airtable-photos/214-1024x768.jpg",
    issues: ["Droopy Tip"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Droopy Tip with Rhinoplasty",
  },

  // Resolve Dry Lips with Filler
  {
    photo: "/airtable-photos/juvederm-ultra-lip-filler-injection.webp",
    issues: ["Dry", "Lips"],
    treatment: "Filler",
    treatmentCardTitle: "Lip Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Dry Lips with Filler",
  },

  // Resolve Excess Skin - Lower Eyelid with Blepharoplasty
  {
    photo: "/airtable-photos/Saggy-Eyelid-Surgery.jpg",
    issues: ["Lower", "Eyelid", "Excess Skin"],
    treatment: "Blepharoplasty",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Excess Skin - Lower Eyelid with Blepharoplasty",
  },

  // Resolve Excess Skin - Lower Eyelid with Chemical Peel
  {
    photo: "/airtable-photos/full face chemical peel.jpg",
    issues: ["Lower", "Eyelid", "Excess Skin"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.lidlift.com/non-surgical-medical-treatments-beverly-hills/chemical-peels/peel-case-studies/",
    name: "Resolve Excess Skin - Lower Eyelid with Chemical Peel",
  },

  // Resolve Excess Skin - Lower Eyelid with Filler
  {
    photo:
      "/airtable-photos/Resolve_Excess_Skin_-_Lower_Eyelid_with_Filler.jpg",
    issues: ["Lower", "Eyelid", "Excess Skin"],
    treatment: "Filler",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Excess Skin - Lower Eyelid with Filler",
  },

  // Resolve Excess Skin - Lower Eyelid with Heat/Energy
  {
    photo: "/airtable-photos/laser undereyeskin.jpg",
    issues: ["Lower", "Eyelid", "Excess Skin"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.ravalmd.com/blog/laser-resurfacing-under-the-eyes",
    name: "Resolve Excess Skin - Lower Eyelid with Heat/Energy",
  },

  // Resolve Excess Skin - Lower Eyelid with Microneedling
  {
    photo: "/airtable-photos/face-tite-before-and-after-1-1.jpeg",
    issues: ["Lower", "Eyelid", "Excess Skin"],
    treatment: "Microneedling",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Excess Skin - Lower Eyelid with Microneedling",
  },

  // Resolve Excess Skin - Lower Eyelid with Topical/Skincare
  {
    photo: "/airtable-photos/under eye skincare.png",
    issues: ["Lower", "Eyelid", "Excess Skin"],
    treatment: "Topical/Skincare",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "https://hydropeptide.com/products/retinol-eye-renewal",
    name: "Resolve Excess Skin - Lower Eyelid with Topical/Skincare",
  },

  // Resolve Excess Skin - Upper Eyelid with Blepharoplasty
  {
    photo: "/airtable-photos/EC003F18-2ABE-433A-AF92-6E2E3608A998.JPG",
    issues: ["Excess", "Upper", "Eyelid Skin"],
    treatment: "Blepharoplasty",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "dr J patient",
    name: "Resolve Excess Skin - Upper Eyelid with Blepharoplasty",
  },

  // Resolve Excess Skin - Upper Eyelid with Chemical Peel
  {
    photo:
      "/airtable-photos/Resolve_Excess_Skin_-_Upper_Eyelid_with_Chemical_Peel.jpg",
    issues: ["Excess", "Upper", "Eyelid Skin"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Excess Skin - Upper Eyelid with Chemical Peel",
  },

  // Resolve Excess Skin - Upper Eyelid with Heat/Energy
  {
    photo: "/airtable-photos/upper eyelid laser.png",
    issues: ["Excess", "Upper", "Eyelid Skin"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.raleigheyeandface.com/laser-resurfacing-gallery",
    name: "Resolve Excess Skin - Upper Eyelid with Heat/Energy",
  },

  // Resolve Eyelid Bags with Blepharoplasty
  {
    photo: "/airtable-photos/EC003F18-2ABE-433A-AF92-6E2E3608A998.JPG",
    issues: ["Lower", "Eyelid", "Bags"],
    treatment: "Blepharoplasty",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "drj patient",
    name: "Resolve Eyelid Bags with Blepharoplasty",
  },

  // Resolve Eyelid Bags with Filler
  {
    photo: "/airtable-photos/eyelid bag filler.jpg",
    issues: ["Lower", "Eyelid", "Bags"],
    treatment: "Filler",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "https://miloclinic.com/treatments/tear-trough.aspx",
    name: "Resolve Eyelid Bags with Filler",
  },

  // Resolve Flat Forehead with Fat Grafting
  {
    photo: "/airtable-photos/fat-transfer-face-01.jpg",
    issues: ["Flat", "Forehead"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Flat Forehead with Fat Grafting",
  },

  // Resolve Flat Forehead with Filler
  {
    photo: "/airtable-photos/flat forehead filler.webp",
    issues: ["Flat", "Forehead"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.realself.com/question/forehead-fillers-indentation",
    name: "Resolve Flat Forehead with Filler",
  },

  // Resolve Gummy Smile with Filler
  {
    photo: "/airtable-photos/7367D59A-8F68-4DDA-AD50-0FD16206553A.jpg",
    issues: ["Gummy Smile"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://imagesmedspa.com/blog/how-to-fix-a-gummy-smile/",
    name: "Resolve Gummy Smile with Filler",
  },

  // Resolve Gummy Smile with Lip Release
  {
    photo: "/airtable-photos/Resolve_Gummy_Smile_with_Lip_Release.jpg",
    issues: ["Gummy Smile"],
    treatment: "Lip Release",
    treatmentCardTitle: "Lip Release",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.quora.com/Can-upper-lip-frenulum-resection-change-our-smile",
    name: "Resolve Gummy Smile with Lip Release",
  },

  // Resolve Gummy Smile with Neurotoxin
  {
    photo: "/airtable-photos/tox gummy smile.jpg",
    issues: ["Gummy Smile"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Botox Forehead",
    storyTitle: "",
    storyDetailed: "",
    source: "https://draharonov.com/non-surgical/neurotoxins-botox-dysport/",
    name: "Resolve Gummy Smile with Neurotoxin",
  },

  // Resolve Jawline Ill-Defined with Chemical Peel
  {
    photo: "/airtable-photos/peel jawline.webp",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.se-plasticsurgery.com/blog/chemical-peels-before-after-transformations/",
    name: "Resolve Jawline Ill-Defined with Chemical Peel",
  },

  // Resolve Jawline Ill-Defined with Facelift
  {
    photo: "/airtable-photos/necklift .png",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Facelift",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.williamsfacialsurgery.com/blog/what-is-deep-plane-facelift/",
    name: "Resolve Jawline Ill-Defined with Facelift",
  },

  // Resolve Jawline Ill-Defined with Fat Grafting
  {
    photo: "/airtable-photos/fat tx jawline.webp",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://plasticsurgerykey.com/chapter-28-structural-fat-grafting-in-the-chin-and-jawline/",
    name: "Resolve Jawline Ill-Defined with Fat Grafting",
  },

  // Resolve Jawline Ill-Defined with Filler
  {
    photo:
      "/airtable-photos/Radiesse-injection-for-jawline-sculpting-and-definition.webp",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Filler",
    treatmentCardTitle: "Jawline Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jawline Ill-Defined with Filler",
  },

  // Resolve Jawline Ill-Defined with Filler
  {
    photo: "/airtable-photos/jawline fillerm1.jpg",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Filler",
    treatmentCardTitle: "Jawline Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.maiaplasticsurgery.com/before-after/botox-and-fillers/fillers/jawline-filler/?popup=gallery-img-7584",
    name: "Resolve Jawline Ill-Defined with Filler",
  },

  // Resolve Jawline Ill-Defined with Heat/Energy
  {
    photo: "/airtable-photos/Resolve_Jawline_Ill-Defined_with_Heat_Energy.jpg",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jawline Ill-Defined with Heat/Energy",
  },

  // Resolve Jawline Ill-Defined with Jaw Implant
  {
    photo: "/airtable-photos/jawline implants.jpg",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Jaw Implant",
    treatmentCardTitle: "Jaw Implant",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.eppleyplasticsurgery.com/jawline-enhancement-gallery/",
    name: "Resolve Jawline Ill-Defined with Jaw Implant",
  },

  // Resolve Jawline Ill-Defined with Liposuction
  {
    photo: "/airtable-photos/jaw defined lipo.png",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Liposuction",
    treatmentCardTitle: "Liposuction",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jawline Ill-Defined with Liposuction",
  },

  // Resolve Jawline Ill-Defined with Microneedling
  {
    photo: "/airtable-photos/microneedling jawline.jpg",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source: "https://naturopathyspa.com/face-beauty/rf-microneedling/",
    name: "Resolve Jawline Ill-Defined with Microneedling",
  },

  // Resolve Jawline Ill-Defined with Threadlift
  {
    photo: "/airtable-photos/jawline threadlift.jpg",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "http://www.tremedspa.com/pdo-thread-lift.html",
    name: "Resolve Jawline Ill-Defined with Threadlift",
  },

  // Resolve Jowls with Chemical Peel
  {
    photo: "/airtable-photos/Resolve_Jowls_with_Chemical_Peel.jpg",
    issues: ["Jowls"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jowls with Chemical Peel",
  },

  // Resolve Jowls with Facelift/Necklift
  {
    photo: "/airtable-photos/Resolve_Jowls_with_Facelift_Necklift.jpg",
    issues: ["Jowls"],
    treatment: "Facelift/Necklift",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jowls with Facelift/Necklift",
  },

  // Resolve Jowls with Heat/Energy
  {
    photo: "/airtable-photos/Resolve_Jowls_with_Heat_Energy.jpg",
    issues: ["Jowls"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jowls with Heat/Energy",
  },

  // Resolve Jowls with Microneedling
  {
    photo: "/airtable-photos/rf microneedling jowls.jpeg",
    issues: ["Jowls"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.rejuvemedicalspa.com/blog-1/genius-rf-microneedling-why-its-so-effective-for-skin-tightening-and-acne-scars",
    name: "Resolve Jowls with Microneedling",
  },

  // Resolve Jowls with Threadlift
  {
    photo: "/airtable-photos/Resolve_Jowls_with_Threadlift.jpg",
    issues: ["Jowls"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Jowls with Threadlift",
  },

  // Resolve Lacking Philtral Column with Fat Grafting
  {
    photo: "/airtable-photos/fat tx lips philtral.jpg",
    issues: ["Lacking", "Philtral", "Column"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.chevychasecosmeticcenter.com/fat-transfer/",
    name: "Resolve Lacking Philtral Column with Fat Grafting",
  },

  // Resolve Lacking Philtral Column with Filler
  {
    photo: "/airtable-photos/lipfiller philtrum.jpg",
    issues: ["Lacking", "Philtral", "Column"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://hob-aesthetics.com/lip-filler-before-and-after/",
    name: "Resolve Lacking Philtral Column with Filler",
  },

  // Resolve Lacking Philtral Column with Lip Lift
  {
    photo: "/airtable-photos/liplift.jpg",
    issues: ["Lacking", "Philtral", "Column"],
    treatment: "Lip Lift",
    treatmentCardTitle: "Lip Lift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drlamperti.com/service/seattle-plastic-surgery-treatments/chin-and-lip/lip-lift",
    name: "Resolve Lacking Philtral Column with Lip Lift",
  },

  // Resolve Lip Thinning When Smiling with Lip Lift
  {
    photo: "/airtable-photos/thin lip lift.jpg",
    issues: ["Lip", "Thinning When", "Smiling"],
    treatment: "Lip Lift",
    treatmentCardTitle: "Lip Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.kalos-plasticsurgery.com/lip-enhancement",
    name: "Resolve Lip Thinning When Smiling with Lip Lift",
  },

  // Resolve Lip Thinning When Smiling with Neurotoxin
  {
    photo: "/airtable-photos/lip flip.jpg",
    issues: ["Lip", "Thinning When", "Smiling"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Lip Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Lip Thinning When Smiling with Neurotoxin",
  },

  // Resolve Long Philtral Column with Filler
  {
    photo: "/airtable-photos/shorten philtrum filler.jpg",
    issues: ["Long", "Philtral", "Column"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.cosmedocs.com/treatments/lip-fillers-injections/",
    name: "Resolve Long Philtral Column with Filler",
  },

  // Resolve Long Philtral Column with Lip Lift
  {
    photo: "/airtable-photos/lip lift long phil.webp",
    issues: ["Long", "Philtral", "Column"],
    treatment: "Lip Lift",
    treatmentCardTitle: "Lip Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Long Philtral Column with Lip Lift",
  },

  // Resolve Lower Cheek Over Fill with Buccal Fat Pad Removal
  {
    photo: "/airtable-photos/buccal fat.jpg",
    issues: ["Lower", "Cheeks", "Over-Filled"],
    treatment: "Buccal Fat Pad Removal",
    treatmentCardTitle: "Buccal Fat Removal",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.maloneycenter.com/buccal-fat-pad-removal-gallery/",
    name: "Resolve Lower Cheek Over Fill with Buccal Fat Pad Removal",
  },

  // Resolve Lower Cheek Volume Depletion with Fat Grafting
  {
    photo: "/airtable-photos/fat transfer lower cheeks.png",
    issues: ["Lower", "Cheeks", "Volume", "Depletion"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.realself.com/surgical/facial-fat-transfer",
    name: "Resolve Lower Cheek Volume Depletion with Fat Grafting",
  },

  // Resolve Lower Cheek Volume Depletion with Filler
  {
    photo: "/airtable-photos/lower face fillers.webp",
    issues: ["Lower", "Cheeks", "Volume", "Depletion"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.rejuvent.com/lower-face-rejuvenation/",
    name: "Resolve Lower Cheek Volume Depletion with Filler",
  },

  // Resolve Lower Eyelid Sag with Blepharoplasty
  {
    photo: "/airtable-photos/152026.png",
    issues: ["Lower", "Eyelid", "Sag"],
    treatment: "Blepharoplasty",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Lower Eyelid Sag with Blepharoplasty",
  },

  // Resolve Masseter Hypertrophy with Neurotoxin
  {
    photo: "/airtable-photos/STCH-C702-V1797-S4.jpg",
    issues: ["Masseter", "Hypertrophy"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Botox Forehead",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Masseter Hypertrophy with Neurotoxin",
  },

  // Resolve Mid Cheek - Flattened with Cheek Implant
  {
    photo: "/airtable-photos/cheek implant.jpg",
    issues: ["Mid", "Cheek", "Flattening"],
    treatment: "Chin Implant",
    treatmentCardTitle: "Chin Implant",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://galleryofcosmeticsurgery.com/plastic-surgery-orange-county/face/chin-cheek-augmentation/",
    name: "Resolve Mid Cheek - Flattened with Cheek Implant",
  },

  // Resolve Mid Cheek - Flattened with Facelift
  {
    photo: "/airtable-photos/facelift.jpg",
    issues: ["Mid", "Cheek", "Flattening"],
    treatment: "Facelift",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.maiaplasticsurgery.com/facelift-before-after/",
    name: "Resolve Mid Cheek - Flattened with Facelift",
  },

  // Resolve Mid Cheek - Flattened with Fat Grafting
  {
    photo: "/airtable-photos/fat tx to face.jpg",
    issues: ["Mid", "Cheek", "Flattening"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://westsideplasticsurgery.com/facial-procedures/facial-fat-grafting/",
    name: "Resolve Mid Cheek - Flattened with Fat Grafting",
  },

  // Resolve Mid Cheek - Flattened with Filler
  {
    photo: "/airtable-photos/cheek filler.jpg",
    issues: ["Mid", "Cheek", "Flattening"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.skinbylovely.com/blog/dermal-fillers-with-before-after-photos/",
    name: "Resolve Mid Cheek - Flattened with Filler",
  },

  // Resolve Narrow Jawline with Filler
  {
    photo: "/airtable-photos/narrowjawline filler.webp",
    issues: ["Narrow", "Jawline"],
    treatment: "Filler",
    treatmentCardTitle: "Jawline Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.mirrormirrorhouston.com/blog/6-ways-to-achieve-a-beautiful-jawline-minus-the-surgery",
    name: "Resolve Narrow Jawline with Filler",
  },

  // Resolve Narrow Jawline with Jaw Implant
  {
    photo: "/airtable-photos/jaw implant narrow jawline.jpg",
    issues: ["Narrow", "Jawline"],
    treatment: "Jaw Implant",
    treatmentCardTitle: "Jaw Implant",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://exploreplasticsurgery.com/case-study-three-implant-jawline-augmentation/",
    name: "Resolve Narrow Jawline with Jaw Implant",
  },

  // Resolve Nasal Tip Too Wide with Rhinoplasty
  {
    photo: "/airtable-photos/Blake-Lively-Before-and-After.jpg",
    issues: ["Nasal Tip Too", "Wide"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Nasal Tip Too Wide with Rhinoplasty",
  },

  // Resolve Neck Excess Skin with Chemical Peel
  {
    photo: "/airtable-photos/Resolve_Neck_Excess_Skin_with_Chemical_Peel.jpg",
    issues: ["Loose", "Neck Skin"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.abelldermatology.com/neck-decollete-treatments/",
    name: "Resolve Neck Excess Skin with Chemical Peel",
  },

  // Resolve Neck Excess Skin with Facelift
  {
    photo: "/airtable-photos/99D5A747-1636-459E-B164-93FA650D8FDF.jpg",
    issues: ["Loose", "Neck Skin"],
    treatment: "Facelift",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source: "dr j patient",
    name: "Resolve Neck Excess Skin with Facelift",
  },

  // Resolve Neck Excess Skin with Filler
  {
    photo: "/airtable-photos/neck skin excess filler.jpg",
    issues: ["Loose", "Neck Skin"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://dermmedica.ca/before-after-gallery-kelowna/neck-line-fillers-before-after-photos/",
    name: "Resolve Neck Excess Skin with Filler",
  },

  // Resolve Neck Excess Skin with Neurotoxin
  {
    photo: "/airtable-photos/neck laxity tox.jpg",
    issues: ["Loose", "Neck Skin"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Neck Botox",
    storyTitle: "",
    storyDetailed: "",
    source: "https://helmplastics.com/medspa/neurotoxin/",
    name: "Resolve Neck Excess Skin with Neurotoxin",
  },

  // Resolve Neck Excess Skin with Topical/Skincare
  {
    photo: "/airtable-photos/neck laxity with topical.jpg",
    issues: ["Loose", "Neck Skin"],
    treatment: "Topical/Skincare",
    treatmentCardTitle: "Skincare",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.skinceuticals.com/skincare/retinol-creams/tripeptide-r-neck-repair/S82.html",
    name: "Resolve Neck Excess Skin with Topical/Skincare",
  },

  // Resolve Negative Canthal Tilt with Lateral Canthopexy
  {
    photo:
      "/airtable-photos/Resolve_Negative_Canthal_Tilt_with_Lateral_Canthopexy.jpg",
    issues: ["Negative", "Canthal Tilt"],
    treatment: "Canthopexy",
    treatmentCardTitle: "Canthopexy",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Negative Canthal Tilt with Lateral Canthopexy",
  },

  // Resolve Nose Over-Projected with Rhinoplasty
  {
    photo: "/airtable-photos/99153F75-E58A-4C5B-B483-00271612A37B.jpg",
    issues: ["Over-Projected"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "dr j pt",
    name: "Resolve Nose Over-Projected with Rhinoplasty",
  },

  // Resolve Nose Over-Rotated with Liquid Rhinoplasty
  {
    photo: "/airtable-photos/upturned liquid rhino.jpg",
    issues: ["Over-Rotated"],
    treatment: "Liquid Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://carolinafacialplasticsurgery.com/what-nose-non-surgical-rhinoplasty/",
    name: "Resolve Nose Over-Rotated with Liquid Rhinoplasty",
  },

  // Resolve Nose Under-Projected with Liquid Rhinoplasty
  {
    photo: "/airtable-photos/underprojected filler.jpg",
    issues: ["Under-Projected"],
    treatment: "Liquid Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.rhinoplastyinseattle.com/service/seattle-plastic-surgery-treatments/rhinoplasty-treatments/short-upturned-tip",
    name: "Resolve Nose Under-Projected with Liquid Rhinoplasty",
  },

  // Resolve Nose Under-Rotated with Rhinoplasty
  {
    photo: "/airtable-photos/rhinoplasty-291-view-3-detail.jpg",
    issues: ["Under-Rotated"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Nose Under-Rotated with Rhinoplasty",
  },

  // Resolve Nose Under-Rotated with Threadlift
  {
    photo: "/airtable-photos/beforeafter-feature-threadliftnose.jpg",
    issues: ["Under-Rotated"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Nose Under-Rotated with Threadlift",
  },

  // Resolve Oily Skin with Topical/Skincare
  {
    photo: "/airtable-photos/oily skin topical copy.jpg",
    issues: ["Oily"],
    treatment: "Topical/Skincare",
    treatmentCardTitle: "Skincare",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.skinician.com/blogs/oily-skin-blog/katkas-skin-journey-oily-skin",
    name: "Resolve Oily Skin with Topical/Skincare",
  },

  // Resolve Over-Projected Chin with Jaw Reduction
  {
    photo:
      "/airtable-photos/Resolve_Over-Projected_Chin_with_Jaw_Reduction.jpg",
    issues: ["Over-Projected", "Chin"],
    treatment: "Jaw Reduction",
    treatmentCardTitle: "Jaw Reduction",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Over-Projected Chin with Jaw Reduction",
  },

  // Resolve Platysmal Bands with Heat/Energy
  {
    photo: "/airtable-photos/image0013.jpg",
    issues: ["Platysmal Bands"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Platysmal Bands with Heat/Energy",
  },

  // Resolve Platysmal Bands with Necklift
  {
    photo: "/airtable-photos/Platysmal-Bands-Causes-and-Treatments.jpg",
    issues: ["Platysmal Bands"],
    treatment: "Necklift",
    treatmentCardTitle: "Neck Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Platysmal Bands with Necklift",
  },

  // Resolve Platysmal Bands with Neurotoxin
  {
    photo: "/airtable-photos/botox_neck2_5_10_22.jpg",
    issues: ["Platysmal Bands"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Neck Botox",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Platysmal Bands with Neurotoxin",
  },

  // Resolve Platysmal Bands with Threadlift
  {
    photo: "/airtable-photos/PDO-threads-before-after-1024x632.png",
    issues: ["Platysmal Bands"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Platysmal Bands with Threadlift",
  },

  // Resolve Prejowl Sulcus with Facelift
  {
    photo: "/airtable-photos/prejowl facelift.jpg",
    issues: ["Prejowl", "Sulcus"],
    treatment: "Facelift",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://drgrecoface.com/case-37311/",
    name: "Resolve Prejowl Sulcus with Facelift",
  },

  // Resolve Prejowl Sulcus with Filler
  {
    photo: "/airtable-photos/prejowl filler.jpg",
    issues: ["Prejowl", "Sulcus"],
    treatment: "Filler",
    treatmentCardTitle: "Prejowl Sulcus Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reflectionscenter.com/gallery/filler-for-cheeks-chin-marionette-lines-pre-jowl-sulcus-and-jawline/",
    name: "Resolve Prejowl Sulcus with Filler",
  },

  // Resolve Prejowl Sulcus with Threadlift
  {
    photo: "/airtable-photos/prejowl threadlift.jpg",
    issues: ["Prejowl", "Sulcus"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://restorebeauty.net/mint-pdo-thread-lift/",
    name: "Resolve Prejowl Sulcus with Threadlift",
  },

  // Resolve Retruded Chin with Chin Implant
  {
    photo: "/airtable-photos/7557D79A-8852-4418-A014-A90584DE271D.jpg",
    issues: ["Retruded", "Chin"],
    treatment: "Chin Implant",
    treatmentCardTitle: "Chin Implant",
    storyTitle: "",
    storyDetailed: "",
    source: "drj pt",
    name: "Resolve Retruded Chin with Chin Implant",
  },

  // Resolve Retruded Chin with Fat Grafting
  {
    photo: "/airtable-photos/chin aug fat tx.webp",
    issues: ["Retruded", "Chin"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.caloaesthetics.com/photos/surgery-center/fat-transfer/507/",
    name: "Resolve Retruded Chin with Fat Grafting",
  },

  // Resolve Retruded Chin with Filler
  {
    photo: "/airtable-photos/chin aug filler.jpg",
    issues: ["Retruded", "Chin"],
    treatment: "Filler",
    treatmentCardTitle: "Chin Augmentation",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://rejuvenisbeauty.com/procedures/procedure/nonsurgical-chin-augmentation/",
    name: "Resolve Retruded Chin with Filler",
  },

  // Resolve Temporal Hollow with Fat Grafting
  {
    photo: "/airtable-photos/fat tx temples.webp",
    issues: ["Temporal", "Hollow"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://orangecountycosmeticsurgery.com/Before_After/fat-transfer---face/6600/",
    name: "Resolve Temporal Hollow with Fat Grafting",
  },

  // Resolve Temporal Hollow with Filler
  {
    photo: "/airtable-photos/Dermal-filler-in-the-temple-1296x728-slide1.webp",
    issues: ["Temporal", "Hollow"],
    treatment: "Filler",
    treatmentCardTitle: "Temporal Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.healthline.com/health/beauty-skin-care/fillers-for-temples#gallery-open",
    name: "Resolve Temporal Hollow with Filler",
  },

  // Resolve Thin Lips with Filler
  {
    photo: "/airtable-photos/juvederm-ultra-lip-filler-injection.webp",
    issues: ["Thin", "Lips"],
    treatment: "Filler",
    treatmentCardTitle: "Lip Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Thin Lips with Filler",
  },

  // Resolve Thin Lips with Filler
  {
    photo: "/airtable-photos/lip-augmentation-with-juvederm-ultra.webp",
    issues: ["Thin", "Lips"],
    treatment: "Filler",
    treatmentCardTitle: "Lip Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Thin Lips with Filler",
  },

  // Resolve Thin Lips with Lip Lift
  {
    photo: "/airtable-photos/Resolve_Thin_Lips_with_Lip_Lift.jpg",
    issues: ["Thin", "Lips"],
    treatment: "Lip Lift",
    treatmentCardTitle: "Lip Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Thin Lips with Lip Lift",
  },

  // Resolve Tip Droop When Smiling with Neurotoxin
  {
    photo: "/airtable-photos/botox tip droop.jpeg",
    issues: ["Tip Droop When", "Smiling"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Botox Forehead",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.instagram.com/hgmedaesthetics/p/C1X4QGlupo5/",
    name: "Resolve Tip Droop When Smiling with Neurotoxin",
  },

  // Resolve Tip Droop When Smiling with Rhinoplasty
  {
    photo: "/airtable-photos/rhino tip droop.jpeg",
    issues: ["Tip Droop When", "Smiling"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.potomacplasticsurgery.com/blog/depressor-septi-improving-a-droopy-nasal-tip-with-rhinoplasty-surgery/",
    name: "Resolve Tip Droop When Smiling with Rhinoplasty",
  },

  // Resolve Upper Eye Hollow with Fat Grafting
  {
    photo:
      "/airtable-photos/Beverly-Hills-Droopy-Eyelid-Ptosis-Oculoplastic-Surgery.jpg",
    issues: ["Upper", "Eye", "Hollow"],
    treatment: "Fat Grafting",
    treatmentCardTitle: "Fat Transfer",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Upper Eye Hollow with Fat Grafting",
  },

  // Resolve Upper Eye Hollow with Filler
  {
    photo: "/airtable-photos/Slide11-1.jpg",
    issues: ["Upper", "Eye", "Hollow"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
    name: "Resolve Upper Eye Hollow with Filler",
  },

  // Fade Scars with Heat/Energy
  {
    photo: "/airtable-photos/fade scars laser.jpg",
    issues: ["Scars"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.aad.org/public/cosmetic/scars-stretch-marks/laser-treatment-scar",
    name: "Fade Scars with Heat/Energy",
  },

  // Fade Scars with Chemical Peel
  {
    photo: "/airtable-photos/fade scars peel.jpg",
    issues: ["Scars"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.hushla.net/chemical-peels-for-pimple-scars/",
    name: "Fade Scars with Chemical Peel",
  },

  // Fade Scars with Microneedling
  {
    photo: "/airtable-photos/fade scar microneedling.jpeg",
    issues: ["Scars"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.finelineseattle.com/microneedling",
    name: "Fade Scars with Microneedling",
  },

  // Smooth Smile Lines with Microneedling
  {
    photo: "/airtable-photos/microneeding nlf marionette shadow correction.jpg",
    issues: ["Nasolabial Folds", "Marionette", "Lines"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.bareelementlasersalon.com/microneedling-rochester-ny",
    name: "Smooth Smile Lines with Microneedling",
  },

  // Smooth Smile Lines with Threadlift
  {
    photo: "/airtable-photos/threadlift nlf marionette.jpg",
    issues: ["Nasolabial Folds", "Marionette", "Lines"],
    treatment: "Threadlift",
    treatmentCardTitle: "Thread Lift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://miraclefacemedspanyc.com/pdo-thread-lift/",
    name: "Smooth Smile Lines with Threadlift",
  },

  // Smooth Under Eye Wrinkles with Microneedling
  {
    photo: "/airtable-photos/microneedling rf undereyes.jpg",
    issues: ["Under", "Eye", "Wrinkles"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reflectionscenter.com/gallery/rf-microneedling-for-improvement-of-crepey-skin-under-eyes/",
    name: "Smooth Under Eye Wrinkles with Microneedling",
  },

  // Smooth Under Eye Wrinkles with Filler
  {
    photo: "/airtable-photos/undereye wrinkle filler.jpg",
    issues: ["Under", "Eye", "Wrinkles"],
    treatment: "Filler",
    treatmentCardTitle: "Tear Trough Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://westerwoodhealth.co.uk/services/aesthetic-treatments/under-eye-wrinkles/",
    name: "Smooth Under Eye Wrinkles with Filler",
  },

  // Smooth Neck Lines with Microneedling
  {
    photo: "/airtable-photos/microneedling neck lines.webp",
    issues: ["Neck", "Lines"],
    treatment: "Microneedling",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.berksplasticsurgery.com/skin/skinpen-microneedling-reading-pa/",
    name: "Smooth Neck Lines with Microneedling",
  },

  // Smooth Neck Lines with Filler
  {
    photo: "/airtable-photos/necklines filler.webp",
    issues: ["Neck", "Lines"],
    treatment: "Filler",
    treatmentCardTitle: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.beautyfixmedspa.com/products/neck-filler-injection",
    name: "Smooth Neck Lines with Filler",
  },

  // Smooth Neck Lines with Neurotoxin
  {
    photo: "/airtable-photos/techneck tox.jpeg",
    issues: ["Neck", "Lines"],
    treatment: "Neurotoxin",
    treatmentCardTitle: "Neck Botox",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.juverne.com/blog/microbotox",
    name: "Smooth Neck Lines with Neurotoxin",
  },

  // Smooth Under Eye Wrinkles with Neurotoxin
  {
    photo: "/airtable-photos/undereye tox.jpg",
    issues: ["Under", "Eye", "Wrinkles"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "https://celibre.com/dysport-before-after-pictures/",
    name: "Smooth Under Eye Wrinkles with Neurotoxin",
  },

  // Resolve Upper Eyelid Droop with Upneeq
  {
    photo: "/airtable-photos/upneeq.png",
    issues: ["Upper", "Eyelid Droop"],
    treatment: "Unknown",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.ljcmedspa.com/procedures/medical-spa/face-neck/upneeq/",
    name: "Resolve Upper Eyelid Droop with Upneeq",
  },

  // Hydrate Dry Lips with Topical HLA
  {
    photo: "/airtable-photos/hydrated lips topical.jpg",
    issues: ["Dry", "Lips"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "https://mooiskin.co.nz/products/pca-hyaluronic-acid-lip-booster",
    name: "Hydrate Dry Lips with Topical HLA",
  },

  // Resolve Nose Under-Projected with Rhinoplasty
  {
    photo: "/airtable-photos/0098258C-DCA5-4509-A5BD-AA727D4723B8.jpg",
    issues: ["Under-Projected"],
    treatment: "Rhinoplasty",
    treatmentCardTitle: "Rhinoplasty",
    storyTitle: "",
    storyDetailed: "",
    source: "drj pt",
    name: "Resolve Nose Under-Projected with Rhinoplasty",
  },

  // Resolve Under Eye Hollow with Oral/Topical
  {
    photo: "/airtable-photos/undereye hollow topical.webp",
    issues: ["Under", "Eye", "Hollow"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drbrandtskincare.com/products/needles-no-more-no-more-baggage",
    name: "Resolve Under Eye Hollow with Oral/Topical",
  },

  // Resolve Under Eye Hollow with Heat/Energy
  {
    photo: "/airtable-photos/undereye laser.jpeg",
    issues: ["Under", "Eye", "Hollow"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://vidaskinbeautycenter.com/under-eye-bags-circles-co2-laser-correction",
    name: "Resolve Under Eye Hollow with Heat/Energy",
  },

  // Resolve Under Eye Hollow with Chemical Peel
  {
    photo: "/airtable-photos/undereye chemical peel.webp",
    issues: ["Under", "Eye", "Hollow"],
    treatment: "Unknown",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.dermedicoclinic.in/under-eye-chemical-peel-treatment-delhi-ncr/",
    name: "Resolve Under Eye Hollow with Chemical Peel",
  },

  // Resolve Under Eye Hollow with Microneedling
  {
    photo: "/airtable-photos/microneedling undereyes.webp",
    issues: ["Under", "Eye", "Hollow"],
    treatment: "Unknown",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reddit.com/r/SkincareAddiction/comments/10a5zv3/microneedling_before_and_after_undereye_help/",
    name: "Resolve Under Eye Hollow with Microneedling",
  },

  // Resolve Upper Eyelid Droop with Chemical Peel
  {
    photo: "/airtable-photos/upper lid chemical peel.jpg",
    issues: ["Upper", "Eyelid Droop"],
    treatment: "Unknown",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "https://tabanmd.com/what-can-chemical-peels-do-for-your-eyes/",
    name: "Resolve Upper Eyelid Droop with Chemical Peel",
  },

  // Resolve Upper Eyelid Droop with Heat/Energy
  {
    photo: "/airtable-photos/upper lid laser.jpeg",
    issues: ["Upper", "Eyelid Droop"],
    treatment: "Unknown",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source: "https://vidaskinbeautycenter.com/viveci-co2-laser-eyelift-madonna",
    name: "Resolve Upper Eyelid Droop with Heat/Energy",
  },

  // Resolve Upper Eyelid Droop with Heat/Energy
  {
    photo: "/airtable-photos/upperlid laser.webp",
    issues: ["Upper", "Eyelid Droop"],
    treatment: "Unknown",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drhconsult.co.uk/treatments/laser-resurfacing/laser-eyelid-tightening/",
    name: "Resolve Upper Eyelid Droop with Heat/Energy",
  },

  // Brighten Under Eye Dark Circles with Microneedling
  {
    photo: "/airtable-photos/undereye dark microneedling.jpg",
    issues: ["Under", "Eye", "Dark", "Circles"],
    treatment: "Unknown",
    treatmentCardTitle: "Microneedling",
    storyTitle: "",
    storyDetailed: "",
    source: "https://freshfaceandeye.com/microneedling-before-after-photos/",
    name: "Brighten Under Eye Dark Circles with Microneedling",
  },

  // Improve Cheekbone Fullness with Facelift
  {
    photo: "/airtable-photos/cheek facelift.jpg",
    issues: ["Cheekbone Not", "Prominent"],
    treatment: "Unknown",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.michaellawmd.com/midface-cheek-lift.html",
    name: "Improve Cheekbone Fullness with Facelift",
  },

  // Improve Cheekbone Fullness with Facelift
  {
    photo: "/airtable-photos/ethnic cheek facelift.jpg",
    issues: ["Cheekbone Not", "Prominent"],
    treatment: "Unknown",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://galleryofcosmeticsurgery.com/wp-content/uploads/2017/06/Asian-Facelift-Orange-County.jpg",
    name: "Improve Cheekbone Fullness with Facelift",
  },

  // Improve Cheekbone Fullness with Facial Implant
  {
    photo: "/airtable-photos/cheekbone implant.jpg",
    issues: ["Cheekbone Not", "Prominent"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.sailerclinic.com/en/specialist-fields/aesthetic-surgery/cheekbone-reconstruction/",
    name: "Improve Cheekbone Fullness with Facial Implant",
  },

  // Smooth Smile Lines with Facelift
  {
    photo: "/airtable-photos/smile lines facelift.png",
    issues: ["Nasolabial Folds", "Marionette", "Lines"],
    treatment: "Unknown",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.williamsfacialsurgery.com/blog/what-is-deep-plane-facelift/",
    name: "Smooth Smile Lines with Facelift",
  },

  // Solve Ill Defined Jawline with Necklift
  {
    photo: "/airtable-photos/4233780C-47F5-4B5F-B8DD-F26846E6B56C.jpg",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "drj pt",
    name: "Solve Ill Defined Jawline with Necklift",
  },

  // Solve Ill Defined Jawline with Facelift
  {
    photo: "/airtable-photos/faceliftnecklift jawline.webp",
    issues: ["Ill-Defined", "Jawline"],
    treatment: "Unknown",
    treatmentCardTitle: "Facelift",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.chrismoss.com.au/before-and-after/face-lift/",
    name: "Solve Ill Defined Jawline with Facelift",
  },

  // Solve Excess Submental Fullness with Necklift
  {
    photo: "/airtable-photos/necklift submental fullness.jpg",
    issues: ["Excess/Submental", "Fullness"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.nayakplasticsurgery.com/before-after/face/deep-necklift/50/",
    name: "Solve Excess Submental Fullness with Necklift",
  },

  // Solve Prejowl Sulcus with Fat Grafting
  {
    photo: "/airtable-photos/jawline fat tx.jpeg",
    issues: ["Prejowl", "Sulcus"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drdenizkanliada.com/micro-fat-and-nano-fat-transfer-for-face-rejuvenation/",
    name: "Solve Prejowl Sulcus with Fat Grafting",
  },

  // Solve Prejowl Sulcus with Facial Implant
  {
    photo: "/airtable-photos/implant prejowl sulcus.png",
    issues: ["Prejowl", "Sulcus"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2FImplantech%2Fstatus%2F969618182716583936&psig=AOvVaw2Cp0cGbb-XGvldtqLMzDKS&ust=1726106056297000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCZsaXkuYgDFQAAAAAdAAAAABAE",
    name: "Solve Prejowl Sulcus with Facial Implant",
  },

  // Solve Under Eye Wrinkles with Blepharoplasty
  {
    photo: "/airtable-photos/undereye wrinkles bleph.jpg",
    issues: ["Under", "Eye", "Wrinkles"],
    treatment: "Unknown",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drphilipmiller.com/procedures/facial-plastic-surgery/eyelid-surgery-blepharoplasty/",
    name: "Solve Under Eye Wrinkles with Blepharoplasty",
  },

  // Solve Under Eye Wrinkles with Blepharoplasty
  {
    photo: "/airtable-photos/undereye wrinkles bleph2.jpg",
    issues: ["Under", "Eye", "Wrinkles"],
    treatment: "Unknown",
    treatmentCardTitle: "Eyelid Surgery",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.drkennethkim.com/before-after-photos-los-angeles/lower-blepharoplasty-lower-eyelid-surgery/",
    name: "Solve Under Eye Wrinkles with Blepharoplasty",
  },

  // Diminish Red Spots with Chemical Peel
  {
    photo: "/airtable-photos/red spots laser.jpg",
    issues: ["Red", "Spots"],
    treatment: "Chemical Peels",
    treatmentCardTitle: "Chemical Peel",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.suddenlyslimmer.com/facial/chemical-peels/",
    name: "Diminish Red Spots with Chemical Peel",
  },

  // Diminish Red Spots with Heat/Energy
  {
    photo: "/airtable-photos/red spots laser.webp",
    issues: ["Red", "Spots"],
    treatment: "Heat/Energy",
    treatmentCardTitle: "Laser Treatment",
    storyTitle: "",
    storyDetailed: "",
    source: "https://www.longbeachdermdocs.com/laser-spot-removal",
    name: "Diminish Red Spots with Heat/Energy",
  },

  // Diminish Blackheads with Oral/Topical
  {
    photo: "/airtable-photos/blackheads exfoliate.jpg",
    issues: ["Blackheads"],
    treatment: "Unknown",
    treatmentCardTitle: "Treatment",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://celestolite.com/wp-content/uploads/blackheads-blackheads.jpg",
    name: "Diminish Blackheads with Oral/Topical",
  },
];

// Helper function to get the best photo for a treatment using local photos
export function getBestPhotoForTreatment(
  treatmentName: string,
  serves: string[]
): string | null {
  let bestMatch: PhotoMapping | null = null;
  let bestScore = 0;

  for (const mapping of photoMappings) {
    let score = 0;

    // 1. Exact treatment name match (highest priority)
    if (mapping.treatment.toLowerCase() === treatmentName.toLowerCase()) {
      score += 50;
    } else if (
      mapping.treatment.toLowerCase().includes(treatmentName.toLowerCase()) ||
      treatmentName.toLowerCase().includes(mapping.treatment.toLowerCase())
    ) {
      score += 25;
    }

    // 2. Treatment card title matching (also high priority)
    if (
      mapping.treatmentCardTitle.toLowerCase() === treatmentName.toLowerCase()
    ) {
      score += 45;
    } else if (
      mapping.treatmentCardTitle
        .toLowerCase()
        .includes(treatmentName.toLowerCase()) ||
      treatmentName
        .toLowerCase()
        .includes(mapping.treatmentCardTitle.toLowerCase())
    ) {
      score += 20;
    }

    // 3. Treatment category matching
    const treatmentCategory = getTreatmentCategory(treatmentName);
    const photoCategory = getTreatmentCategory(mapping.treatment);
    if (treatmentCategory === photoCategory) {
      score += 10;
    }

    // 4. Issues matching
    if (serves && serves.length > 0) {
      for (const serve of serves) {
        for (const issue of mapping.issues) {
          if (issue.toLowerCase() === serve.toLowerCase()) {
            score += 10;
          } else if (
            issue.toLowerCase().includes(serve.toLowerCase()) ||
            serve.toLowerCase().includes(issue.toLowerCase())
          ) {
            score += 5;
          } else {
            const serveWords = serve.toLowerCase().split(/\s+/);
            const issueWords = issue.toLowerCase().split(/\s+/);
            const wordMatches = serveWords.filter((word: string) =>
              issueWords.some(
                (issueWord: string) =>
                  issueWord.includes(word) || word.includes(issueWord)
              )
            );
            score += wordMatches.length;
          }
        }
      }
    }

    // 5. Story title matching (bonus points)
    if (mapping.storyTitle) {
      const storyWords = mapping.storyTitle.toLowerCase().split(/\s+/);
      const treatmentWords = treatmentName.toLowerCase().split(/\s+/);
      const storyMatches = treatmentWords.filter((word: string) =>
        storyWords.some(
          (storyWord: string) =>
            storyWord.includes(word) || word.includes(storyWord)
        )
      );
      score += storyMatches.length * 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = mapping;
    }
  }

  return bestMatch ? bestMatch.photo : null;
}

// Helper function to get the full mapping data for a treatment
export function getLocalPhotoMappingData(
  treatmentName: string,
  serves: string[]
): PhotoMapping | null {
  let bestMatch: PhotoMapping | null = null;
  let bestScore = 0;

  for (const mapping of photoMappings) {
    let score = 0;

    // 1. Exact treatment name match (highest priority)
    if (mapping.treatment.toLowerCase() === treatmentName.toLowerCase()) {
      score += 50;
    } else if (
      mapping.treatment.toLowerCase().includes(treatmentName.toLowerCase()) ||
      treatmentName.toLowerCase().includes(mapping.treatment.toLowerCase())
    ) {
      score += 25;
    }

    // 2. Treatment card title matching (also high priority)
    if (
      mapping.treatmentCardTitle.toLowerCase() === treatmentName.toLowerCase()
    ) {
      score += 45;
    } else if (
      mapping.treatmentCardTitle
        .toLowerCase()
        .includes(treatmentName.toLowerCase()) ||
      treatmentName
        .toLowerCase()
        .includes(mapping.treatmentCardTitle.toLowerCase())
    ) {
      score += 20;
    }

    // 3. Treatment category matching
    const treatmentCategory = getTreatmentCategory(treatmentName);
    const photoCategory = getTreatmentCategory(mapping.treatment);
    if (treatmentCategory === photoCategory) {
      score += 10;
    }

    // 4. Issues matching
    if (serves && serves.length > 0) {
      for (const serve of serves) {
        for (const issue of mapping.issues) {
          if (issue.toLowerCase() === serve.toLowerCase()) {
            score += 10;
          } else if (
            issue.toLowerCase().includes(serve.toLowerCase()) ||
            serve.toLowerCase().includes(issue.toLowerCase())
          ) {
            score += 5;
          } else {
            const serveWords = serve.toLowerCase().split(/\s+/);
            const issueWords = issue.toLowerCase().split(/\s+/);
            const wordMatches = serveWords.filter((word: string) =>
              issueWords.some(
                (issueWord: string) =>
                  issueWord.includes(word) || word.includes(issueWord)
              )
            );
            score += wordMatches.length;
          }
        }
      }
    }

    // 5. Story title matching (bonus points)
    if (mapping.storyTitle) {
      const storyWords = mapping.storyTitle.toLowerCase().split(/\s+/);
      const treatmentWords = treatmentName.toLowerCase().split(/\s+/);
      const storyMatches = treatmentWords.filter((word: string) =>
        storyWords.some(
          (storyWord: string) =>
            storyWord.includes(word) || word.includes(storyWord)
        )
      );
      score += storyMatches.length * 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = mapping;
    }
  }

  return bestMatch;
}

// Helper function to categorize treatments
function getTreatmentCategory(treatmentName: string): string {
  const name = treatmentName.toLowerCase();
  if (
    name.includes("filler") ||
    name.includes("juvederm") ||
    name.includes("voluma")
  )
    return "filler";
  if (
    name.includes("botox") ||
    name.includes("neurotoxin") ||
    name.includes("tox")
  )
    return "botox";
  if (name.includes("peel") || name.includes("chemical")) return "peel";
  if (
    name.includes("surgical") ||
    name.includes("rhinoplasty") ||
    name.includes("blepharoplasty") ||
    name.includes("facelift")
  )
    return "surgical";
  if (name.includes("skincare") || name.includes("topical")) return "skincare";
  if (name.includes("thread") || name.includes("threadlift")) return "thread";
  return "other";
}
