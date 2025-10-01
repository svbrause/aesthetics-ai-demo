// Photo mappings based on CSV data
// This maps treatments and issues to relevant photos

export interface PhotoMapping {
  photo: string;
  issues: string[];
  treatment: string;
  storyTitle?: string;
  storyDetailed?: string;
  source?: string;
}

// Sample photo mappings from the CSV data
export const photoMappings: PhotoMapping[] = [
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/-yvzx6JY__TUGGcjF8jrxA/nK20TCi0QRRu5_CdA8k_W38RG4GF8NVjjI0aFfZK_GRA9F2sIbzURe43wSJwlwY7mBOSXiaXPpM2k47WCrT-2JjgoNl3bYoDAZIT4GbYQnp6H22xFKok0OqKz-esBK73fdMfEA4mnB_kHiICzbnlbOxtCLFTEDHnAhZ-jj1RYhgabq5RRyFpnXanPGfYf0pI/31oQZynrO0zTvH6imgrrmclzm4d6k0lJ76cquO4GUwQ",
    issues: [
      "Excess/Submental Fullness",
      "Obtuse Cervicomental Angle [DEPRECATED]",
    ],
    treatment: "Heat/Energy",
    storyTitle:
      "How I Redefined My Jawline with Emface—No Needles, No Downtime",
    storyDetailed:
      "For years, this patient felt self-conscious about the fullness under her chin and the gradual softening of her jawline. She wanted a natural-looking lift—something subtle yet effective, without the invasiveness of surgery or fillers. With a series of Emface treatments targeting her cheeks and submental area, she achieved a more sculpted, youthful contour. Just one month after her fourth session, her jawline appears firmer, her profile more defined, and her confidence revitalized—all without a single injection.",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/YbIzFUWT6Jq5Pnh7MYK59w/0jasXQNnmxCzI4IaYFuSoq5K6XAMOGCXGBP_zob6CM3kXrpe4i_Mz0BnDn8WFCKDGFIw9ea4y9ITZnpEhKjAXSn4R6qNsyX_-xfdqTpgB4aSbSe6LL4bDkX_FjLTbc2GIYthDOvhffbvG58YpFDIufJ0aUrnlrCwSQPywXsNHl8/dl132obSIILtStCfiy_igRbj_M2OHGR002wuQWyIxPM",
    issues: [
      "Excess/Submental Fullness",
      "Obtuse Cervicomental Angle [DEPRECATED]",
    ],
    treatment: "Kybella",
    storyTitle:
      "How I Eliminated My Double Chin with Kybella—No Surgery, Just Results",
    storyDetailed:
      "For years, this patient struggled with stubborn fullness under her chin that wouldn't budge, no matter how much she dieted or exercised. She wanted a more defined jawline but wasn't ready for invasive procedures. With Kybella, a series of targeted injections that dissolve fat permanently, she gradually achieved the sculpted profile she had always wanted. After multiple sessions and a few months of natural fat clearance, her jawline now looks slimmer, more contoured, and beautifully defined—without the need for surgery or downtime.",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/hX6eWzrCmK39CR5NW3byzA/AKUi0dfvj2G4edfTY37mchYRdg3yqg8HRNFXpyGzfKMALIFBapi46H6ZDGGijvHLgip9bGympr48zVOzoifpuC3SKz5On2xzMsY82HWb9LhjuPcTDqgKR0-QUYlrPoP6msg8v1XxNBEhtHwujHFNnEkNZDQujOqaEM4blyexxXwgrytpY1I5dYHzTGJXgA5g8kjDxiiQviFnTIaarDDFnA/HSwLZQmfcnZdDfvd8YOtojfxIbHnlOAvjDJGNBZj8dM",
    issues: [
      "Excess/Submental Fullness",
      "Obtuse Cervicomental Angle [DEPRECATED]",
    ],
    treatment: "Liposuction",
    storyTitle:
      "Sleek and Sculpted: How I Transformed My Jawline with Chin Liposuction",
    storyDetailed:
      "A fuller jawline and excess volume under the chin made this patient feel like her profile lacked definition. She wanted a sharper, more contoured look that highlighted her natural bone structure. With a quick and effective chin liposuction procedure, she achieved a dramatic yet natural enhancement. Now, her jawline is sleek, her neck is refined, and her confidence shines—proof that a small change can make a big impact.",
    source:
      "https://www.drsterry.com/photo-gallery/face/neck-liposuction-chin-liposuction-/55/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/MpknR7dwUwFEbI22QLNOYA/Ui-Mmau60QUxEoQRNbRejIMabcqCMU9xNXIeKqrKvHZTG8aILi-pawAzI1j5CX3nh0vhppWIjrWQZSsd3W50lTW8lcw5QcHAUtPxBppQNj2M7MDuU3yD_o4ZbxcjfemrCQ7GfIDu_uC3ltIcCVgZoVRyFHAEi9HsQzqSpplz2itlDZ9NHMO-0rEhreNF9PwJ-aiWNYGsYCmNgT5W9msXcg/3hm6euxGry6epr4osgFk8rY1SgrgZoEB4wQYhoReFpo",
    issues: ["Acne [DEPRECATED]"],
    treatment: "Topical/Skincare",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/k-qTaYZJATRgLumiCOKToA/seXuLkXQY6h7ar4Qv3tMKoP-UR_fAgoRmZGQuPrLgI8J64-6yLY6VZhRlQ4jN8-LY1uJaxo8_LpkEYDVpHkS4I4xoBJWpSILl2Wn41LfpxPJ7FsO1qQpb5iRiTA-kgduRvVysN7uKXUY58uhvzfRHVefV2isi5dv8vygNt1JjjLyXGjJG5sGqEosTPseJAM6/yk_Zkt15lsuhn31ZViVP5q7rFqrAThDEli4APCOFLR8",
    issues: ["Dark Spots"],
    treatment: "Chemical Peels",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/fLE_62Ch9G30uMtY9ZzWjQ/5iN3IH1aZ1zIOL0Lv02w1eM7zxjA5kcDxavmxB3QfRB-hH3n9AP0GmEKz5HmsiFeRDU1wKqnkEaYL-hJ71-ELEog1nIfi_2VauTG2OWsMmLPGMgl56maaaOa5liSq5wDJKdLz4t9IDHAu2CCFvhvRuqtxFrWeYKvnH4LS2fbf-mcybkb3TTOxH1KQfzt8OhK/jC2smoWcewgl4z6Fby5bgPIqgC_BbT0zaww7iWtRXg",
    issues: ["Dark Spots"],
    treatment: "Heat/Energy",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/hJLr1D71Vu4SM_oKZs0XNA/Z_d1S60NZOnyCQH9IGwLb5krc6Cehub2moOjVxNhdtueM2ZyjETO8y--IdkG_KayV8kHnS--diBkn_lNYFpu9oNLzPq0XtMDhpu2LEj1pqXbCaNRSs0SFuy-GAGgGPh63g-pl7CjvT86Pj-mlLnzg0RzVGLkvzjw-jEdJZKi44sbe6T48FB8GkApJVTsxouu/9aL6yDLp362Ht6Gkg5lonCdSQ-3WYNJRQwycJvnlZ58",
    issues: ["Dark Spots"],
    treatment: "Topical/Skincare",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reddit.com/r/30PlusSkinCare/comments/16lfu4s/3_week_progress_update_tret_005_hydroquinone_4/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/OD9naa1yQ1uXF1JBG2CKLw/_1NGUSdCIwgyVWQbND6NzQF_M11C4xbwUEc2Fv38KuAyD0DI2VhSaGf0ezZhTqOio7WbLic9n6zYwvX5T6I9jhjoAavDI_f1HHwhXKkXf9SWsD0vQ1pN8RmccNHLr6Iw5Q3yqY4MJWwdDIvCPonBiSs_45XVheUKihs1Az8Jl8Y/sOhpN_WzZ7YPcnzrlqP6Hbb1Q405IUcsUTpZ9I0o9_c",
    issues: ["Nasolabial Folds", "Marionette Lines", "Jowls"],
    treatment: "Fat Grafting",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/rgSeoinoHkvlrkYg_0g82g/MSpwHTr-yFcVrP4tl2Zgv6CPd98GWAIc_RgMPDZpvaTLrCvtto-muYxX23TF_iMs4kmVNxwuvO9Wm-xGQ--O4jFsOXrKMP6ViM4spgTZS5C6bQK2RE3YDIQtsWJGGV6LHKGBvKk0lPZLn4sykUJUZSRDmGCBW0mNWF-su0y-TBE0iWjARSweMCQbvEB2ZoVzrh9lmJDvLg4b2GvcaLbJSdpuGtwRzY6tS1SuUtkQXTk-8ExtEybo0oAh-9Q9DyVq/PyXFmPysYpQ9F0ZeIqp0AVzs-ypYpOny92AzoPGu8aA",
    issues: ["Nasolabial Folds"],
    treatment: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/BkpNMiL8b1znEHv21ScWFg/HapRm0xDGbqmGJop4yZz3f7w0FIpSjQ5MwrxXe0EpA6adUeHBWDUR90Y03dbqOVJUz0T2HaXhxhSdQY7UR2W5bCFkdO8A_55NJ-JeIdBrgwI-mqA9-WED9nB7vs7yU_WYlWyPR_jJMU/HOmSXb22vo4IkJe8fjRLxUjicTvSaIq6--r7aFyUDA4",
    issues: ["Nasolabial Folds"],
    treatment: "Heat/Energy",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/ZS7A6QWLTMSenXEM_Psl5A/W0QKXtmwG73imrCmkgupvJZJXhC1P42YrRs3Q0u0m25vZo3ZC2MuP0JRlHSTuUZgfZ4BuTCLrXqOV8jirysaPCbZ8X7SHZCmdtklo2W9sbB75Mt4haMjJM7TcE5NVBVujF03IEAgTlzaVOlLXrYgJlT41D448Z2r3MksKEmddxISzlYUcMk8QR71lLSNHHsj/uba0aAMkCyvcAAM5NxB86wyYaCigXntci4uHWFnNFE",
    issues: ["Under Eye Dark Circles"],
    treatment: "Chemical Peels",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://skyskinclinic.in/brighten-your-eyes-exploring-the-effectiveness-of-chemical-peels-for-dark-circles/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/I8cB3VqTBvT-d9QmK4kwWg/y6kCJX78grzr7eMGtnAelmasq-q8WUIgpOiEeSUxg--VfoLdnsWmhPw9LXaSwfLpgicYkIqTiBSBelzYE0a4mABAKqQMlPtmAag-VoWmag9Ja13cl-sW95SfpPqQGwBwjLM4ALcB8v1RjsxqCnTnrA/V2cRo4JlAJdyNO-gjpmxB62elOhabZOsY47xCBKW2w",
    issues: ["Under Eye Dark Circles"],
    treatment: "Fat Grafting",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.clinic5c.com/gallery/surgical/facial-fat-transfer/item/116764446/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/b-nIdgrb1_-OacNfFMHDQw/Q0UgORI_nKAW_JK5ffW12FTwsLIKvk21Nlue2iMoVEviHwYIeBkfeBCmh7GDt7oOEa9KOegj3eGQ9AaFAXrEVTpT3Z8omCJM3hTpqkTksI5RLIo6V5rVfvFrkhXXjXv8GCvLYGwDxSxQXb0ZlnmcZpvLAFj656vTgROpkhtVb25X7-N-AcpVVK6b2QnkSKsk/uzS3z7-rcNlwf30CV7YscStaQiVmj6LK1GXfs1nMoTY",
    issues: ["Under Eye Dark Circles"],
    treatment: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source: "https://artisanacademy.beauty/contour-and-correct/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/Ofy6huQlIAZnHECVHQuhMw/EF068RiEQfoJucU_oJAIApAkvHX46RJPzIIao9tuz5moUhn0qUNESZtgc4H0W7ka-Y5Z0qVqsMtHXuZ_RCGCpUL_joo0N_ckhgOGWUGROdOnj9NnFzp3wvAPYPn40IzkrmE3JzYqUGHBjqHRuFZghYb5CwJBW1y_cvTCwbzwLSM/VS4smoWcewgl4z6Fby5bgPIqgC_BbT0zaww7iWtRXg",
    issues: ["Under Eye Dark Circles"],
    treatment: "Heat/Energy",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/sJuN1Husmv1FiUStQ5iT8Q/-SW2rGeK2aummEDFS4Im-JQRs0XqyqLX2tG9hPhD_ZkhllS54OeHXlBRnPv8Tzxpgax--gmDGWby60igo5YzipgYIJcycnrSO4uTJ_Zl-JQ6fqRB3km0cDzTsnbs_xFLCTuwHYo7S-nncujMeoArwISZPzEHlMTOqcNjTn-c_A/Bx1ONSMqZB8Y9chm8pL707MfWRbnGQgSaRxcdBUvGOk",
    issues: ["Under Eye Dark Circles"],
    treatment: "Topical/Skincare",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.usmagazine.com/shop-with-us/news/goldfaden-md-arnica-dark-circle-eye-cream-amazon-beauty/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/cCFUi7P98Hcyqh1Ayj4cog/PEfX5H8XlMR8s8MXKMUDGXRIwUFFf8DdbQD_qGPDaJO40-sPqWZpdpiDSjW2y9FBjydnJSnj9UgkOfqpSTUBiZHWelh-VWZAWURYMAEgVyLgjgufjlQ2KpuycZxR9IhzwYoON1McVwWELB3jlu6BU3unM_gqQnFz-ptkwHW7BK4/KaoKTd3zsbsifUVhg6Ol1yK6N2CWHXsBkNNDx6GivLA",
    issues: ["Asymmetric Lips"],
    treatment: "Filler",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://europepmc.org/articles/PMC5782440/bin/JCAS-10-153-g003.jpg",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/GHBotU__Uq-brkPCn9PCZA/MzzMN8_qOZ7D7ZIfEhzA1-UUFXat8iwP9H_GSBfbXHuAXjSCJ6Djks1UYF-siGtLJb0auR1jfaUWwdmMGcZ59CEfMFsXm1a2WYjkIkp_wdwQPMoTSZ9NJIjgvuQz_DHY9yDwNCFdQ9tTm-y6-L5DTE8WdBFj3EhhjxPF-MSfj5A/j_1In6mW0ms1z6XfFolZ_Uu3XdNgtcAb9QGNxrEwSQ8",
    issues: ["Asymmetric Lips"],
    treatment: "Lip Lift",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F3-months-post-lip-lift-surgery-v0-5ri07ws1xf0b1.jpg%3Fwidth%3D2048%26format%3Dpjpg%26auto%3Dwebp%26s%3D15f73d41a8b1643551fd22c2f9ac08f6c8919f1c",
  },
  // Additional mappings for common treatments
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/rgSeoinoHkvlrkYg_0g82g/MSpwHTr-yFcVrP4tl2Zgv6CPd98GWAIc_RgMPDZpvaTLrCvtto-muYxX23TF_iMs4kmVNxwuvO9Wm-xGQ--O4jFsOXrKMP6ViM4spgTZS5C6bQK2RE3YDIQtsWJGGV6LHKGBvKk0lPZLn4sykUJUZSRDmGCBW0mNWF-su0y-TBE0iWjARSweMCQbvEB2ZoVzrh9lmJDvLg4b2GvcaLbJSdpuGtwRzY6tS1SuUtkQXTk-8ExtEybo0oAh-9Q9DyVq/PyXFmPysYpQ9F0ZeIqp0AVzs-ypYpOny92AzoPGu8aA",
    issues: ["Mid Cheek Flattening"],
    treatment: "Injectable Fillers",
    storyTitle: "",
    storyDetailed: "",
    source: "",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/b-nIdgrb1_-OacNfFMHDQw/Q0UgORI_nKAW_JK5ffW12FTwsLIKvk21Nlue2iMoVEviHwYIeBkfeBCmh7GDt7oOEa9KOegj3eGQ9AaFAXrEVTpT3Z8omCJM3hTpqkTksI5RLIo6V5rVfvFrkhXXjXv8GCvLYGwDxSxQXb0ZlnmcZpvLAFj656vTgROpkhtVb25X7-N-AcpVVK6b2QnkSKsk/uzS3z7-rcNlwf30CV7YscStaQiVmj6LK1GXfs1nMoTY",
    issues: ["Under Eye Dark Circles", "Under Eye Hollow"],
    treatment: "Injectable Fillers",
    storyTitle: "",
    storyDetailed: "",
    source: "https://artisanacademy.beauty/contour-and-correct/",
  },
  {
    photo:
      "https://v5.airtableusercontent.com/v3/u/45/45/1758232800000/ZS7A6QWLTMSenXEM_Psl5A/W0QKXtmwG73imrCmkgupvJZJXhC1P42YrRs3Q0u0m25vZo3ZC2MuP0JRlHSTuUZgfZ4BuTCLrXqOV8jirysaPCbZ8X7SHZCmdtklo2W9sbB75Mt4haMjJM7TcE5NVBVujF03IEAgTlzaVOlLXrYgJlT41D448Z2r3MksKEmddxISzlYUcMk8QR71lLSNHHsj/uba0aAMkCyvcAAM5NxB86wyYaCigXntci4uHWFnNFE",
    issues: ["Under Eye Dark Circles"],
    treatment: "Botox & Neurotoxins",
    storyTitle: "",
    storyDetailed: "",
    source:
      "https://skyskinclinic.in/brighten-your-eyes-exploring-the-effectiveness-of-chemical-peels-for-dark-circles/",
  },
];

// Helper function to find the best photo for a treatment based on its serves array
export function getBestPhotoForTreatment(
  treatmentName: string,
  serves: string[]
): string | null {
  // First try to find exact matches
  let bestMatch = photoMappings.find(
    (mapping) =>
      mapping.treatment.toLowerCase() === treatmentName.toLowerCase() &&
      serves.some((serve) =>
        mapping.issues.some(
          (issue) =>
            issue.toLowerCase().includes(serve.toLowerCase()) ||
            serve.toLowerCase().includes(issue.toLowerCase())
        )
      )
  );

  // If no exact match, try partial matches
  if (!bestMatch) {
    bestMatch = photoMappings.find(
      (mapping) =>
        mapping.treatment.toLowerCase().includes(treatmentName.toLowerCase()) &&
        serves.some((serve) =>
          mapping.issues.some(
            (issue) =>
              issue.toLowerCase().includes(serve.toLowerCase()) ||
              serve.toLowerCase().includes(issue.toLowerCase())
          )
        )
    );
  }

  // If still no match, try just treatment name
  if (!bestMatch) {
    bestMatch = photoMappings.find((mapping) =>
      mapping.treatment.toLowerCase().includes(treatmentName.toLowerCase())
    );
  }

  return bestMatch?.photo || null;
}

// Get all photos for a specific treatment
export function getAllPhotosForTreatment(
  treatmentName: string
): PhotoMapping[] {
  return photoMappings.filter((mapping) =>
    mapping.treatment.toLowerCase().includes(treatmentName.toLowerCase())
  );
}

// Get photos for specific issues
export function getPhotosForIssues(issues: string[]): PhotoMapping[] {
  return photoMappings.filter((mapping) =>
    issues.some((issue) =>
      mapping.issues.some(
        (mappingIssue) =>
          mappingIssue.toLowerCase().includes(issue.toLowerCase()) ||
          issue.toLowerCase().includes(mappingIssue.toLowerCase())
      )
    )
  );
}
