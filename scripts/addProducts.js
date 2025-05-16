import fetch from "node-fetch";
import 'dotenv/config';
const API_BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

const products = [
    {
      name: "Duroc Piglet",
      category: "Piglets",
      price: 5200,
      weight: "30-35kg",
      image: "https://media.istockphoto.com/id/515449339/photo/pig-farm-in-highland-scotland.jpg?s=612x612&w=0&k=20&c=C4Bc0IItIYvlxs2I7HjwikikaifmavtdxGxArgRFgLo=",
      description: "Premium Duroc piglets with excellent growth rate and meat quality. 7 weeks old, vaccinated.",
    },
    {
      name: "Large White Piglet",
      category: "Piglets",
      price: 4800,
      weight: "28-32kg",
      image: "https://media.istockphoto.com/id/484079237/photo/piglets.jpg?s=612x612&w=0&k=20&c=vXoSvsGARbyXfChANm_LI61PqDWINDB7tT3JDmyuFEQ=",
      description: "High-quality Large White piglets known for lean meat production. 6 weeks old.",
    },
    {
      name: "Turopolje Piglet",
      category: "Piglets",
      price: 5500,
      weight: "25-30kg",
      image: "https://media.istockphoto.com/id/1388916747/photo/group-of-hampshire-piglets-feeding.jpg?s=612x612&w=0&k=20&c=yynK3v42gODUEHAmCB-aommz51aMVtRqeGrTDIKEKm8=",
      description: "Rare Turopolje piglets, excellent for free-range systems. Gray-spotted coat.",
    },
    {
      name: "Hampshire Piglet",
      category: "Piglets",
      price: 5000,
      weight: "32-35kg",
      image: "https://media.istockphoto.com/id/1388917287/photo/piglets-farm-life.jpg?s=612x612&w=0&k=20&c=klHekk-wxbzsQY8F5CK3msot48DuPLGMnUgiaYd_46s=",
      description: "Hampshire piglets with distinctive white belt. Fast-growing with good carcass quality.",
    },
    {
      name: "Duroc-Large White Cross Piglet",
      category: "Piglets",
      price: 5300,
      weight: "30-34kg",
      image: "https://media.istockphoto.com/id/1739098333/video/two-black-pigs-grazing-side-by-side-in-the-new-forest-hampshire-uk.avif?s=640x640&k=20&c=YLu-Un0E4yML8CT6uZWz1SCZHNapRLixpTfWWStVECM=",
      description: "Vigorous crossbred piglets combining Duroc meat quality with Large White growth.",
    },
    {
      name: "Hampshire-Duroc Cross Piglet",
      category: "Piglets",
      price: 5400,
      weight: "31-36kg",
      image: "https://media.istockphoto.com/id/1388917287/photo/piglets-farm-life.jpg?s=612x612&w=0&k=20&c=klHekk-wxbzsQY8F5CK3msot48DuPLGMnUgiaYd_46s=",
      description: "Premium crossbred piglets with excellent muscling and feed conversion.",
    },
    {
      name: "Large White-Turopolje Cross Piglet",
      category: "Piglets",
      price: 4900,
      weight: "27-31kg",
      image: "https://media.istockphoto.com/id/1289625929/photo/pig-pig-breeding.jpg?s=612x612&w=0&k=20&c=pFcj9gnbxich23xQ3m5fqtMMFPwuCth8S7tVsfZ2GD8=",
      description: "Hardy crossbred piglets suitable for extensive systems.",
    },
    {
      name: "Turopolje-Hampshire Cross Piglet",
      category: "Piglets",
      price: 5100,
      weight: "26-30kg",
      image: "https://media.istockphoto.com/id/1388917287/photo/piglets-farm-life.jpg?s=612x612&w=0&k=20&c=klHekk-wxbzsQY8F5CK3msot48DuPLGMnUgiaYd_46s=",
      description: "Unique cross combining Turopolje hardiness with Hampshire meat quality.",
    },
  
    // Gilts (6 entries)
    {
      name: "Duroc Gilt",
      category: "Gilts",
      price: 15500,
      weight: "120-140kg",
      image: "https://media.istockphoto.com/id/515449339/photo/pig-farm-in-highland-scotland.jpg?s=612x612&w=0&k=20&c=C4Bc0IItIYvlxs2I7HjwikikaifmavtdxGxArgRFgLo=",
      description: "Young Duroc females with excellent maternal traits. 7 months old.",
    },
    {
      name: "Large White Gilt",
      category: "Gilts",
      price: 14500,
      weight: "130-150kg",
      image: "https://media.istockphoto.com/id/1289625929/photo/pig-pig-breeding.jpg?s=612x612&w=0&k=20&c=pFcj9gnbxich23xQ3m5fqtMMFPwuCth8S7tVsfZ2GD8=",
      description: "Quality Large White gilts known for large litters. Ready for breeding.",
    },
    {
      name: "Turopolje Gilt",
      category: "Gilts",
      price: 13500,
      weight: "100-120kg",
      image: "https://media.istockphoto.com/id/1428013036/photo/hogs-or-pigs.jpg?s=612x612&w=0&k=20&c=wVcFaZdv8danuacN1wx2vDDYOI41oIF_hV04sHSOIwg=",
      description: "Rare Turopolje gilts, excellent for organic production systems.",
    },
    {
      name: "Hampshire Gilt",
      category: "Gilts",
      price: 15000,
      weight: "115-135kg",
      image: "https://media.istockphoto.com/id/1388917287/photo/piglets-farm-life.jpg?s=612x612&w=0&k=20&c=klHekk-wxbzsQY8F5CK3msot48DuPLGMnUgiaYd_46s=",
      description: "Hampshire gilts with strong maternal instincts. 8 months old.",
    },
    {
      name: "Duroc-Large White Cross Gilt",
      category: "Gilts",
      price: 14800,
      weight: "125-145kg",
      image: "https://media.istockphoto.com/id/1227205895/photo/young-pig-pose-on-natural-environment-outside.jpg?s=612x612&w=0&k=20&c=fylytu7inlrs0vyuGAV7NVfPVc1zFa43PoHHTguDhG0=",
      description: "Hybrid vigor gilt combining the best traits of both breeds.",
    },
    {
      name: "Hampshire-Turopolje Cross Gilt",
      category: "Gilts",
      price: 14200,
      weight: "110-130kg",
      image: "https://media.istockphoto.com/id/1388917287/photo/piglets-farm-life.jpg?s=612x612&w=0&k=20&c=klHekk-wxbzsQY8F5CK3msot48DuPLGMnUgiaYd_46s=",
      description: "Hardy crossbred gilt suitable for pasture-based systems.",
    },
  
    // Boars (5 entries)
    {
      name: "Duroc Boar",
      category: "Boars",
      price: 22500,
      weight: "250-300kg",
      image: "https://media.istockphoto.com/id/1591489609/photo/pig-of-the-mangalica-breed.jpg?s=612x612&w=0&k=20&c=eY-BmpvNFrYbDZQ9KApi5IvdAX97WxfOkSqS8jSS85U=",
      description: "Proven Duroc sire with exceptional growth genetics and libido.",
    },
    {
      name: "Large White Boar",
      category: "Boars",
      price: 21500,
      weight: "270-320kg",
      image: "https://media.istockphoto.com/id/1919843360/photo/large-white.jpg?s=612x612&w=0&k=20&c=TsI1OxSPEc5LJJeBQP14REyrsJak-FxYOLhZ-i_ZLFw=",
      description: "Premium Large White boar with excellent conformation.",
    },
    {
      name: "Turopolje Boar",
      category: "Boars",
      price: 19500,
      weight: "200-250kg",
      image: "https://media.istockphoto.com/id/1591489609/photo/pig-of-the-mangalica-breed.jpg?s=612x612&w=0&k=20&c=eY-BmpvNFrYbDZQ9KApi5IvdAX97WxfOkSqS8jSS85U=",
      description: "Rare Turopolje breeding boar with excellent hardiness.",
    },
    {
      name: "Hampshire Boar",
      category: "Boars",
      price: 22000,
      weight: "240-290kg",
      image: "https://media.istockphoto.com/id/1077063716/photo/pigs-in-new-forest.jpg?s=612x612&w=0&k=20&c=iGLj3hh37I-RRbwaoBLlNvDxefvfPPLG2MKHCNsa7_I=",
      description: "Quality Hampshire boar with strong legs and good temperament.",
    },
    {
      name: "Duroc-Hampshire Cross Boar",
      category: "Boars",
      price: 21000,
      weight: "230-280kg",
      image: "https://media.istockphoto.com/id/1077063716/photo/pigs-in-new-forest.jpg?s=612x612&w=0&k=20&c=iGLj3hh37I-RRbwaoBLlNvDxefvfPPLG2MKHCNsa7_I=",
      description: "Hybrid terminal sire producing fast-growing offspring.",
    },
  
    // Sows (4 entries)
    {
      name: "Duroc Sow",
      category: "Sows",
      price: 18500,
      weight: "200-250kg",
      image: "https://media.istockphoto.com/id/517802359/photo/pig-on-farm.jpg?s=612x612&w=0&k=20&c=YQCZLpy7LeqN0A0ILSOk6yrE_66hH_1D-ZxT39fVI5U=",
      description: "Proven Duroc mother with excellent milking ability. 2-3 years old.",
    },
    {
      name: "Large White Sow",
      category: "Sows",
      price: 17500,
      weight: "220-270kg",
      image: "https://media.istockphoto.com/id/1919843360/photo/large-white.jpg?s=612x612&w=0&k=20&c=TsI1OxSPEc5LJJeBQP14REyrsJak-FxYOLhZ-i_ZLFw=",
      description: "Reliable Large White sow with history of 12+ piglets per litter.",
    },
    {
      name: "Turopolje Sow",
      category: "Sows",
      price: 16500,
      weight: "180-230kg",
      image: "https://media.istockphoto.com/id/1204184808/photo/large-white-pig-piglet-suckling-sow.jpg?s=612x612&w=0&k=20&c=amQjrZiI46Z8qAVGaVY4ocRK4KJnZElGPPdYVrN1rG0=",
      description: "Hardy Turopolje sow excelling in outdoor systems. 3 years old.",
    },
    {
      name: "Hampshire Sow",
      category: "Sows",
      price: 18000,
      weight: "190-240kg",
      image: "https://media.istockphoto.com/id/1204184808/photo/large-white-pig-piglet-suckling-sow.jpg?s=612x612&w=0&k=20&c=amQjrZiI46Z8qAVGaVY4ocRK4KJnZElGPPdYVrN1rG0=",
      description: "Quality Hampshire sow with excellent mothering instincts.",
    },
  
    {
      name: "Mixed Breed Manure",
      category: "Manure",
      price: 550,
      weight: "50kg bag",
      image: "https://media.istockphoto.com/id/1488312382/photo/a-manure-pile-in-the-country.jpg?s=612x612&w=0&k=20&c=4mVqE1JvZHiFq6aRRm80Q-pqqM9HePyxWs7VKFhdDc4=",
      description: "Organic fertilizer blend from various pig breeds.",
    }
  ];

async function addProducts() {
  try {

    // Add products
    for (const product of products) {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`Added: ${product.name}`);
      } else {
        console.error(`Failed to add ${product.name}:`, data.message);
      }
    }
    console.log("All products have been added!");
  } catch (error) {
    console.error("Error:", error);
  }
}

addProducts();