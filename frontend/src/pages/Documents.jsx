import { useState } from 'react';
import { 
  FileText, Upload, Search, Filter, Download, Eye,
  AlertTriangle, CheckCircle, Clock, XCircle, Calendar,
  Truck, User, Camera, FileUp, ChevronLeft, ChevronRight,
  X, Scan, Loader, Edit3, Save
} from 'lucide-react';
import { documentsData, documentsStats, amendesData } from '../data/documentsData';

const Documents = () => {
  const [documents, setDocuments] = useState(documentsData);
  const [amendes, setAmendes] = useState(amendesData);
  const [accidents, setAccidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('documents');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [declarationType, setDeclarationType] = useState('amende');
  
  const [newDocument, setNewDocument] = useState({ type: 'Carte grise', vehicule: '', fichier: null, dateExpiration: '' });
  const [newAmende, setNewAmende] = useState({ vehicule: '', date: '', lieu: '', montant: '', infraction: '', photo: null });
  const [newAccident, setNewAccident] = useState({ vehicule: '', date: '', lieu: '', description: '', degats: '', photo: null });
  const [editedData, setEditedData] = useState(null);
  
  const itemsPerPage = 5;
  const filteredDocs = documents.filter(d => 
    (d.vehicule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.chauffeur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedType === 'Tous' || d.type === selectedType) &&
    (selectedStatus === 'Tous' || d.statut === selectedStatus)
  );
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedDocs = filteredDocs.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  const stats = [
    { label: 'Total documents', value: documentsStats.total, icon: FileText, color: 'blue' },
    { label: 'Valides', value: documentsStats.valides, icon: CheckCircle, color: 'green' },
    { label: 'Expire bientôt', value: documentsStats.expireBientot, icon: Clock, color: 'yellow' },
    { label: 'Expirés', value: documentsStats.expires, icon: XCircle, color: 'red' },
  ];

  const getStatusBadge = (s) => {
    const map = { 'Valide':'bg-green-100 text-green-700', 'Expire bientôt':'bg-yellow-100 text-yellow-700', 'Expiré':'bg-red-100 text-red-700', 'Payée':'bg-green-100 text-green-700', 'En attente':'bg-yellow-100 text-yellow-700' };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  const handleFileUpload = (e) => setNewDocument({...newDocument, fichier: e.target.files[0]});
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (declarationType === 'amende') setNewAmende(prev => ({ ...prev, photo: file }));
    else setNewAccident(prev => ({ ...prev, photo: file }));
  };

  // ==================== SIMULATION IA RÉALISTE (toujours fonctionnelle) ====================
  const simulerExtraction = () => {
    const photo = declarationType === 'amende' ? newAmende.photo : newAccident.photo;
    const fileName = photo?.name?.toLowerCase() || '';
    const date = new Date().toISOString().split('T')[0];
    
    if (declarationType === 'amende') {
      let montant, infraction, lieu;
      if (fileName.includes('vitesse') || fileName.includes('speed')) {
        montant = 120;
        infraction = 'Excès de vitesse (40 km/h au-dessus)';
        lieu = 'Autoroute A1, km 45';
      } else if (fileName.includes('stationnement') || fileName.includes('parking')) {
        montant = 80;
        infraction = 'Stationnement interdit sur trottoir';
        lieu = 'Avenue Habib Bourguiba';
      } else if (fileName.includes('feu') || fileName.includes('rouge')) {
        montant = 180;
        infraction = 'Non-respect du feu rouge';
        lieu = 'Carrefour Menzah 6';
      } else if (fileName.includes('alcool')) {
        montant = 300;
        infraction = 'Conduite en état d\'ivresse';
        lieu = 'Route de La Marsa';
      } else if (fileName.includes('téléphone') || fileName.includes('phone')) {
        montant = 100;
        infraction = 'Utilisation du téléphone au volant';
        lieu = 'Avenue de France';
      } else if (fileName.includes('ceinture')) {
        montant = 60;
        infraction = 'Non-port de la ceinture de sécurité';
        lieu = 'Route de Sidi Bou Saïd';
      } else {
        const montants = [90, 120, 150, 180, 230];
        const infractions = ['Défaut d\'assurance', 'Défaut de contrôle technique', 'Dépassement de vitesse modéré', 'Chevauchement de ligne continue', 'Non-respect de la priorité'];
        const lieux = ['Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Bizerte', 'Monastir', 'Gabès'];
        montant = montants[Math.floor(Math.random() * montants.length)];
        infraction = infractions[Math.floor(Math.random() * infractions.length)];
        lieu = lieux[Math.floor(Math.random() * lieux.length)];
      }
      return { type: 'amende', montant: montant.toString(), date, lieu, infraction };
    } else {
      let description, lieu;
      if (fileName.includes('voiture') || fileName.includes('car')) {
        description = 'Collision entre deux véhicules légers. Dégâts matériels importants, aucun blessé.';
        lieu = 'Route de La Marsa';
      } else if (fileName.includes('camion') || fileName.includes('truck')) {
        description = 'Accident impliquant un poids lourd. Voie partiellement obstruée, bouchon sur 2 km.';
        lieu = 'Autoroute A1, sortie 5';
      } else if (fileName.includes('moto')) {
        description = 'Accident de deux-roues. Blessé léger transporté à l\'hôpital.';
        lieu = 'Avenue Habib Bourguiba';
      } else if (fileName.includes('piéton')) {
        description = 'Accident impliquant un piéton. Victime consciente, transportée aux urgences.';
        lieu = 'Centre ville';
      } else {
        const descriptions = [
          'Sortie de route suite à une perte de contrôle. Véhicule dans le fossé.',
          'Accident à un carrefour. Non-respect du stop, tôles froissées.',
          'Dérapage sur chaussée glissante. Véhicule contre le trottoir.',
          'Accident matériel sans blessé. Dégâts aux pare-chocs avant et arrière.',
          'Collision à faible vitesse. Conducteurs en état de choc.'
        ];
        description = descriptions[Math.floor(Math.random() * descriptions.length)];
        lieu = ['Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Bizerte'][Math.floor(Math.random() * 5)];
      }
      return { type: 'accident', date, lieu, description, degats: 'Non précisés' };
    }
  };

  const handleOcrScan = () => {
    const photo = declarationType === 'amende' ? newAmende.photo : newAccident.photo;
    if (!photo) {
      alert('Veuillez d\'abord sélectionner une photo');
      return;
    }
    
    setIsOcrLoading(true);
    setScanProgress(0);
    setOcrResult(null);
    setEditMode(false);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
    
    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      const result = simulerExtraction();
      setOcrResult(result);
      setEditedData({ ...result });
      if (declarationType === 'amende') {
        setNewAmende(prev => ({ ...prev, montant: result.montant || '', date: result.date, lieu: result.lieu, infraction: result.infraction || '' }));
      } else {
        setNewAccident(prev => ({ ...prev, date: result.date, lieu: result.lieu, description: result.description, degats: result.degats || '' }));
      }
      setIsOcrLoading(false);
    }, 2000);
  };

  const applyEdit = () => {
    if (!editedData) return;
    if (declarationType === 'amende') {
      setNewAmende(prev => ({ ...prev, montant: editedData.montant || '', date: editedData.date, lieu: editedData.lieu || '', infraction: editedData.infraction || '' }));
    } else {
      setNewAccident(prev => ({ ...prev, date: editedData.date, lieu: editedData.lieu || '', description: editedData.description || '', degats: editedData.degats || '' }));
    }
    setEditMode(false);
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    const newId = `DOC${String(documents.length+1).padStart(3,'0')}`;
    setDocuments([{ id:newId, ...newDocument, numero:'N/A', dateEmission:new Date().toISOString().split('T')[0], statut:'Valide', fichier:newDocument.fichier?.name||'document.pdf', joursRestants:Math.floor((new Date(newDocument.dateExpiration)-new Date())/(1000*60*60*24)) }, ...documents]);
    setIsUploadModalOpen(false);
    setNewDocument({ type:'Carte grise', vehicule:'', fichier:null, dateExpiration:'' });
    alert('Document uploadé avec succès');
  };

  const handleIncidentSubmit = (e) => {
    e.preventDefault();
    if (declarationType === 'amende') {
      const newId = `AM${String(amendes.length+1).padStart(3,'0')}`;
      setAmendes([{ id:newId, ...newAmende, montant:parseFloat(newAmende.montant), statut:'En attente', photo:newAmende.photo?.name||'photo.jpg' }, ...amendes]);
    } else {
      const newId = `ACC${String((accidents.length+1)).padStart(3,'0')}`;
      setAccidents([{ id:newId, ...newAccident, statut:'En attente', photo:newAccident.photo?.name||'photo.jpg' }, ...accidents]);
    }
    setIsIncidentModalOpen(false);
    setNewAmende({ vehicule:'', date:'', lieu:'', montant:'', infraction:'', photo:null });
    setNewAccident({ vehicule:'', date:'', lieu:'', description:'', degats:'', photo:null });
    setOcrResult(null);
    setEditMode(false);
    alert('Incident déclaré avec succès');
  };

  // ==================== RENDU JSX ====================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion Documentaire</h1>
          <p className="text-slate-500">{documentsStats.valides} valides • {documentsStats.expireBientot} expirent bientôt • {documentsStats.expires} expirés</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsIncidentModalOpen(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Camera size={18} /> Déclarer un incident</button>
          <button onClick={() => setIsUploadModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Upload size={18} /> Upload document</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s,i) => (
          <div key={i} className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${s.color}-50 text-${s.color}-600`}><s.icon size={20} /></div>
              <div><p className="text-sm text-slate-500">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Alertes */}
      {(documentsStats.expireBientot>0 || documentsStats.expires>0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-600" size={20} />
          <div><h4 className="font-medium text-amber-800">Alertes documents</h4><p className="text-sm">{documentsStats.expireBientot} expirent bientôt • {documentsStats.expires} expirés</p></div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b flex gap-4">
        <button onClick={() => setActiveTab('documents')} className={`px-4 py-2 text-sm font-medium ${activeTab==='documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Documents</button>
        <button onClick={() => setActiveTab('amendes')} className={`px-4 py-2 text-sm font-medium ${activeTab==='amendes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Incidents</button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder={activeTab==='documents' ? "Rechercher..." : "Rechercher par véhicule ou lieu"} className="w-full pl-10 pr-4 py-2 border rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          {activeTab==='documents' && (
            <div className="flex gap-2">
              <select className="border rounded-lg px-3 py-2" value={selectedType} onChange={e=>setSelectedType(e.target.value)}><option value="Tous">Tous types</option><option>Carte grise</option><option>Assurance</option><option>Permis</option><option>Visite technique</option></select>
              <select className="border rounded-lg px-3 py-2" value={selectedStatus} onChange={e=>setSelectedStatus(e.target.value)}><option value="Tous">Tous statuts</option><option>Valide</option><option>Expire bientôt</option><option>Expiré</option></select>
              <button className="p-2 border rounded-lg"><Filter size={18} /></button>
              <button className="p-2 border rounded-lg"><Download size={18} /></button>
            </div>
          )}
        </div>
      </div>

      {/* Contenu Documents (tableau) */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3 text-left">Type</th><th className="p-3 text-left">Propriétaire</th><th className="p-3 text-left">Numéro</th><th className="p-3 text-left">Expiration</th><th className="p-3 text-left">Statut</th><th className="p-3 text-left">Fichier</th><th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="p-3"><div className="flex items-center gap-2"><FileText size={16} /><span>{doc.type}</span></div></td>
                    <td className="p-3">{doc.vehicule ? <><Truck size={14} className="inline mr-1"/>{doc.vehicule}</> : <><User size={14} className="inline mr-1"/>{doc.chauffeur}</>}</td>
                    <td className="p-3">{doc.numero || 'N/A'}</td>
                    <td className="p-3">{doc.dateExpiration}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(doc.statut)}`}>{doc.statut}</span></td>
                    <td className="p-3">{doc.fichier}</td>
                    <td className="p-3"><Eye size={16} className="cursor-pointer" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t flex justify-between">
            <p className="text-sm">{(currentPage-1)*itemsPerPage+1} à {Math.min(currentPage*itemsPerPage, filteredDocs.length)} sur {filteredDocs.length}</p>
            <div className="flex gap-2">
              <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="p-1 border rounded"><ChevronLeft size={16}/></button>
              <span className="px-3 py-1 border rounded">Page {currentPage} / {totalPages}</span>
              <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="p-1 border rounded"><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>
      )}

      {/* Contenu Incidents */}
      {activeTab === 'amendes' && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3">Type</th><th className="p-3">Véhicule</th><th className="p-3">Date</th><th className="p-3">Lieu</th><th className="p-3">Détails</th><th className="p-3">Statut</th><th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {amendes.map(a => (
                  <tr key={a.id}>
                    <td className="p-3">Amende</td>
                    <td className="p-3">{a.vehicule}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.lieu}</td>
                    <td className="p-3">{a.infraction} - {a.montant} DT</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(a.statut)}`}>{a.statut}</span></td>
                    <td className="p-3"><Eye size={16}/></td>
                  </tr>
                ))}
                {accidents.map(a => (
                  <tr key={a.id}>
                    <td className="p-3">Accident</td>
                    <td className="p-3">{a.vehicule}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.lieu}</td>
                    <td className="p-3">{a.description?.substring(0,50)}...</td>
                    <td className="p-3"><span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">En attente</span></td>
                    <td className="p-3"><Eye size={16}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Upload Document */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">Upload document</h2><button onClick={()=>setIsUploadModalOpen(false)}><X size={20}/></button></div>
            <form onSubmit={handleDocSubmit}>
              <select className="w-full border rounded-lg p-2 mb-3" value={newDocument.type} onChange={e=>setNewDocument({...newDocument,type:e.target.value})}>
                <option>Carte grise</option><option>Assurance</option><option>Permis</option><option>Visite technique</option>
              </select>
              <input type="text" placeholder="Véhicule (matricule)" className="w-full border rounded-lg p-2 mb-3" value={newDocument.vehicule} onChange={e=>setNewDocument({...newDocument,vehicule:e.target.value})} />
              <input type="date" className="w-full border rounded-lg p-2 mb-3" value={newDocument.dateExpiration} onChange={e=>setNewDocument({...newDocument,dateExpiration:e.target.value})} />
              <div className="border-dashed border-2 p-4 text-center mb-3">
                <FileUp className="mx-auto mb-2"/>
                <p className="text-sm">{newDocument.fichier?.name || 'Cliquez pour sélectionner'}</p>
                <input type="file" className="hidden" id="docFile" onChange={handleFileUpload}/>
                <label htmlFor="docFile" className="bg-slate-100 px-4 py-2 rounded cursor-pointer inline-block">Choisir fichier</label>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={()=>setIsUploadModalOpen(false)} className="border px-4 py-2 rounded">Annuler</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Uploader</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Déclaration d'incident avec IA (simulation réaliste) */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Déclarer un incident</h2>
              <button onClick={()=>{setIsIncidentModalOpen(false);setOcrResult(null);setEditMode(false);}}><X size={20}/></button>
            </div>

            {/* Choix manuel */}
            <div className="flex gap-4 mb-4">
              <button type="button" onClick={() => setDeclarationType('amende')} className={`flex-1 py-2 rounded-lg ${declarationType === 'amende' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>Amende</button>
              <button type="button" onClick={() => setDeclarationType('accident')} className={`flex-1 py-2 rounded-lg ${declarationType === 'accident' ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>Accident</button>
            </div>

            <form onSubmit={handleIncidentSubmit}>
              {/* Zone IA */}
              <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-lg p-4 text-center mb-4">
                <Scan className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">🤖 Intelligence Artificielle (simulation intelligente)</p>
                <p className="text-xs text-slate-500 mb-2">
                  {declarationType === 'amende' ? (newAmende.photo?.name || 'Prenez une photo du PV') : (newAccident.photo?.name || 'Prenez une photo de l\'accident')}
                </p>
                {isOcrLoading ? (
                  <div><Loader className="animate-spin inline mr-2"/><span>{scanProgress}%</span><div className="w-full h-2 bg-slate-200 rounded mt-2"><div className="h-full bg-blue-600 rounded" style={{width:`${scanProgress}%`}}/></div></div>
                ) : (
                  <div className="flex gap-2 justify-center flex-wrap">
                    <input type="file" accept="image/*" className="hidden" id="ocrPhoto" onChange={handlePhotoUpload} />
                    <label htmlFor="ocrPhoto" className="bg-white border px-4 py-2 rounded cursor-pointer">📷 Choisir photo</label>
                    <button type="button" onClick={handleOcrScan} disabled={!((declarationType === 'amende' && newAmende.photo) || (declarationType === 'accident' && newAccident.photo))} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">🔍 Scanner avec IA</button>
                  </div>
                )}
              </div>

              {/* Résultat avec édition */}
              {ocrResult && (
                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-green-700 font-medium">✅ Données extraites :</p>
                    {!editMode && (
                      <button type="button" onClick={() => setEditMode(true)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                        <Edit3 size={14} /> Modifier
                      </button>
                    )}
                  </div>
                  {editMode ? (
                    <div className="space-y-2">
                      {declarationType === 'amende' ? (
                        <>
                          <input type="number" placeholder="Montant (DT)" className="w-full border rounded p-1 text-sm" value={editedData?.montant || ''} onChange={e => setEditedData({...editedData, montant: e.target.value})} />
                          <input type="date" className="w-full border rounded p-1 text-sm" value={editedData?.date || ''} onChange={e => setEditedData({...editedData, date: e.target.value})} />
                          <input type="text" placeholder="Lieu" className="w-full border rounded p-1 text-sm" value={editedData?.lieu || ''} onChange={e => setEditedData({...editedData, lieu: e.target.value})} />
                          <input type="text" placeholder="Infraction" className="w-full border rounded p-1 text-sm" value={editedData?.infraction || ''} onChange={e => setEditedData({...editedData, infraction: e.target.value})} />
                        </>
                      ) : (
                        <>
                          <input type="date" className="w-full border rounded p-1 text-sm" value={editedData?.date || ''} onChange={e => setEditedData({...editedData, date: e.target.value})} />
                          <input type="text" placeholder="Lieu" className="w-full border rounded p-1 text-sm" value={editedData?.lieu || ''} onChange={e => setEditedData({...editedData, lieu: e.target.value})} />
                          <textarea placeholder="Description" rows="2" className="w-full border rounded p-1 text-sm" value={editedData?.description || ''} onChange={e => setEditedData({...editedData, description: e.target.value})} />
                        </>
                      )}
                      <button type="button" onClick={applyEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"><Save size={14} /> Appliquer</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1 text-sm mt-1">
                      {declarationType === 'amende' ? (
                        <>
                          {ocrResult.montant && <span>💰 {ocrResult.montant} DT</span>}
                          {ocrResult.date && <span>📅 {ocrResult.date}</span>}
                          {ocrResult.lieu && <span>📍 {ocrResult.lieu}</span>}
                          {ocrResult.infraction && <span>⚠️ {ocrResult.infraction}</span>}
                        </>
                      ) : (
                        <>
                          {ocrResult.date && <span>📅 {ocrResult.date}</span>}
                          {ocrResult.lieu && <span>📍 {ocrResult.lieu}</span>}
                          <span className="col-span-2">📝 {ocrResult.description?.substring(0,80)}...</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Champs communs */}
              <input type="text" placeholder="Véhicule (matricule)" className="w-full border rounded-lg p-2 mb-3" value={declarationType === 'amende' ? newAmende.vehicule : newAccident.vehicule} onChange={e => declarationType === 'amende' ? setNewAmende({...newAmende, vehicule: e.target.value}) : setNewAccident({...newAccident, vehicule: e.target.value})} required />

              {declarationType === 'amende' ? (
                <>
                  <input type="date" className="w-full border rounded-lg p-2 mb-3" value={newAmende.date} onChange={e => setNewAmende({...newAmende, date: e.target.value})} required />
                  <input type="text" placeholder="Lieu" className="w-full border rounded-lg p-2 mb-3" value={newAmende.lieu} onChange={e => setNewAmende({...newAmende, lieu: e.target.value})} required />
                  <input type="number" placeholder="Montant (DT)" className="w-full border rounded-lg p-2 mb-3" value={newAmende.montant} onChange={e => setNewAmende({...newAmende, montant: e.target.value})} required />
                  <input type="text" placeholder="Type d'infraction" className="w-full border rounded-lg p-2 mb-3" value={newAmende.infraction} onChange={e => setNewAmende({...newAmende, infraction: e.target.value})} required />
                </>
              ) : (
                <>
                  <input type="date" className="w-full border rounded-lg p-2 mb-3" value={newAccident.date} onChange={e => setNewAccident({...newAccident, date: e.target.value})} required />
                  <input type="text" placeholder="Lieu" className="w-full border rounded-lg p-2 mb-3" value={newAccident.lieu} onChange={e => setNewAccident({...newAccident, lieu: e.target.value})} required />
                  <textarea placeholder="Description de l'accident" rows="3" className="w-full border rounded-lg p-2 mb-3" value={newAccident.description} onChange={e => setNewAccident({...newAccident, description: e.target.value})} required />
                  <input type="text" placeholder="Dégâts (optionnel)" className="w-full border rounded-lg p-2 mb-3" value={newAccident.degats} onChange={e => setNewAccident({...newAccident, degats: e.target.value})} />
                </>
              )}

              <div className="flex justify-end gap-3">
                <button type="button" onClick={()=>setIsIncidentModalOpen(false)} className="border px-4 py-2 rounded">Annuler</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Déclarer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;