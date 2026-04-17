import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => `"${String(row[header] ?? '').replace(/"/g, '""')}"`);
    csvRows.push(values.join(','));
  }

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn('Aucune donnée à exporter');
    return;
  }

  const doc = new jsPDF('landscape');
  
  // Titre
  doc.setFontSize(18);
  doc.text('Agil - Statistiques', 14, 20);
  doc.setFontSize(12);
  doc.text(`Généré le ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Préparer les données pour le tableau
  const headers = [Object.keys(data[0])];
  const rows = data.map(item => Object.values(item));
  
  // Créer le tableau
  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 40,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 14, right: 14 }
  });
  
  // Sauvegarder le PDF
  doc.save(`${filename}.pdf`);
};