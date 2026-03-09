import logo from "@/assets/logo.png";
import stamp from "@/assets/stamp.png";
import founderPhoto from "@/assets/founder.jpeg";
import clientDesignFlu from "@/assets/client-designflu.png";
import clientLaxmiPrinters from "@/assets/client-laxmiprinters.png";
import clientVicarage from "@/assets/client-vicarage.png";
import workDesignFlu from "@/assets/work-designflu.png";
import workLaxmiPrinters from "@/assets/work-laxmiprinters.png";
import workVicarage from "@/assets/work-vicarage.png";

const allImages = [
  logo,
  stamp,
  clientDesignFlu,
  clientLaxmiPrinters,
  clientVicarage,
  workDesignFlu,
  workLaxmiPrinters,
  workVicarage,
];

export function preloadAllImages() {
  allImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
