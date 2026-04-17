import { createWorker } from 'tesseract.js';

export const scanAmende = async (imageFile) => {
  return new Promise((resolve, reject) => {
    const worker = await createWorker('fra'); // 'fra' pour français
    
    try {
      // Démarrer le worker
      await worker.load();
      await worker.loadLanguage('fra');
      await worker.initialize('fra');
      
      // Convertir l'image en Base64
      const imageUrl = URL.createObjectURL(imageFile);
      
      // Scanner le texte
      const { data: { text } } = await worker.recognize(imageUrl);
      
      // Nettoyer et analyser le texte extrait
      const result = analyserTexteAmende(text);
      
      // Nettoyer
      await worker.terminate();
      URL.revokeObjectURL(imageUrl);
      
      resolve(result);
    } catch (error) {
      console.error('Erreur OCR:', error);
      reject(error);
    }
  });
};

// Analyser le texte extrait pour trouver les informations
const analyserTexteAmende = (texte) => {
  const result = {
    montant: null,
    date: null,
    lieu: null,
    infraction: null
  };
  
  // Rechercher le montant (ex: 120 DT, 120.00, 120)
  const montantMatch = texte.match(/(\d+[.,]?\d*)\s*(DT|TND|dinars?)/i);
  if (montantMatch) {
    result.montant = parseFloat(montantMatch[1].replace(',', '.'));
  }
  
  // Rechercher la date (ex: 15/03/2026, 15-03-2026)
  const dateMatch = texte.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dateMatch) {
    result.date = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
  }
  
  // Rechercher le lieu
  const lieuMatch = texte.match(/(?:lieu|à|au|a)\s*:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
  if (lieuMatch) {
    result.lieu = lieuMatch[1];
  }
  
  // Rechercher le type d'infraction
  const infractions = [
    'excès de vitesse', 'stationnement', 'feu rouge',
    'alcool', 'telephone', 'ceinture', 'dépassement'
  ];
  for (const inf of infractions) {
    if (texte.toLowerCase().includes(inf)) {
      result.infraction = inf;
      break;
    }
  }
  
  return result;
};