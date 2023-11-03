import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [selectedType, setSelectedType] = useState();
  const [caracteristiqueValeurs, setCaracteristiqueValeurs] = useState([]);
  const [types, setTypes] = useState([]);
  const [caracteristiques, setCaracteristiques] = useState([]);

  useEffect(() => {
    // Récupérer la liste des types de produits depuis l'API
    axios
      .get("http://localhost:8089/categories/all")
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types de produits:",
          error
        );
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      axios
        .get(`http://localhost:8089/categories/${selectedType}/category-caracteristiques`)
        .then((response) => {
          setCaracteristiques(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des caractéristiques associées:",
            error
          );
        });
    }
  }, [selectedType]);

 
  const handleCaracteristiqueValueChange = (caracteristiqueId, newValue) => {
    const updatedCaracteristiqueValeurs = [...caracteristiqueValeurs];
    
    const index = updatedCaracteristiqueValeurs.findIndex(item => item.caracteristiqueId === caracteristiqueId);
    
    if (index !== -1) {
      updatedCaracteristiqueValeurs[index].valeur = newValue;
    } else {
      updatedCaracteristiqueValeurs.push({ caracteristiqueId, valeur: newValue });
    }
  
    setCaracteristiqueValeurs(updatedCaracteristiqueValeurs);
  };
  
  

  
  const handleSave = () => {
    const productData = {
      typeId: selectedType,
      productName,
      caracteristiqueValeurs,
    };


    axios
      .post("http://localhost:8089/produits/save", productData)
      .then(() => {
        console.log("Produit enregistré avec succès.");
        setProductName("");
        setCaracteristiqueValeurs([]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement du produit:", error);
      });
  };

  return (
    <div>
      <h1>Créer un nouveau produit</h1>
      <div>
        <label>Nom du produit:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label>Type de produit:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Sélectionnez un type</option>
          {types.map((type) => (
            <option key={type.categoryId} value={type.categoryId}>
              {type.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Caractéristiques et valeurs:</label>

        {caracteristiques.length > 0 && (
  <div>
    <label>Caractéristiques associées au type de produit:</label>
    <ul>
      {caracteristiques.map((caracteristique) => (
        <div key={caracteristique.id}>
          <li>{caracteristique.name}</li>
          <input
            type="text"
            value={
              caracteristiqueValeurs.find(
                (item) => item.caracteristiqueId === caracteristique.id
              )?.valeur || ""
            }
            onChange={(e) => {
              const newValue = e.target.value;
              handleCaracteristiqueValueChange(caracteristique.id, newValue);
            }}
          />
        </div>
      ))}
    </ul>
  </div>
)}




      </div>
      <button onClick={handleSave}>Enregistrer</button>
    </div>
  );
}

export default CreateProduct;
