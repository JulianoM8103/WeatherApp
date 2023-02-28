// WeatherApp by Juliano_M8103
// License CC-BY SA

import React, { useState, useEffect } from 'react'; // Import react
import {TextInput, Button, ImageBackground, StyleSheet, Text, View, Alert, Modal, Pressable } from 'react-native'; // Import react native
import background from 'background.png' // Récupère le background

const styles = StyleSheet.create({ // Style du modal
  placeholder: {
    borderColor: 'black',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    width: 190,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  buttonConfirm: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const viewStyle = StyleSheet.create({
  introView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 250,
  },
});

const textStyle = StyleSheet.create({ // Style du texte
  title: {
    color: 'white',
    fontSize: 70,
    marginTop: 190,
  },
  city: {
    color: 'white',
    fontSize: 40,
    marginBottom: 150,
    marginTop: 100,
  },
  temp: {
    color: 'white',
    fontSize: 20,
  },
  humidity: {
    color: 'white',
    fontSize: 20,
    marginBottom: 50,
  },
  vent: {
    color: 'white',
    fontSize: 20,
    marginBottom: 50,
  },
});

const imgStyle = StyleSheet.create({ // Style des images
  background: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});

const App = () => {
  const [ville, setText] = useState('Paris') // Ville par défaut
  const [modalVisible, setModalVisible] = useState(false); // Le modal pour changer la ville n'est pas visible
  const [temperature, setTemperature] = useState(''); // Température actuelle
  const [temperature_min, setTemperatureMin] = useState(''); // Température minimale
  const [temperature_max, setTemperatureMax] = useState(''); // Température maximale
  const [ressentis, setRessentis] = useState(''); // Température ressentie
  const [vent, setVent] = useState(''); // Vitesse du vent
  const [humidite, setHumidite] = useState(''); // Humidité de l'air

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=eb3e55ca0093756f2541d5ad27c5021c&units=metric`) // Lien de l'api + envoie une requête 
      .then(response => response.json()) // Récupère la réponse de l'API
      .then(data => {
        try {
          setTemperature(data.main.temp + "°C"); // Récupère la température
          setTemperatureMin(data.main.temp_min + "°C"); // Récupère la température minimale
          setTemperatureMax(data.main.temp_max + "°C"); // Récupère la température maximale
          setRessentis(data.main.feels_like + "°C"); // Récupère la température ressentie
          setHumidite(data.main.humidity + "%"); // Récupère l'humidité de l'air
          setVent(data.wind.speed + "m/s") // Récupère la vitesse du vent
        } catch(PossibleUnhandledPromiseRejection) { // Si les données ne peuvent pas être récupérées (généralement la ville est incorrecte)
          Alert.alert('Erreur', "La ville que vous chercher n'existe pas", [{text: 'Ok'},]); // Alerte pour informer que la ville n'est pas trouvée / n'existe pas
          setTemperature('Ville invalide'); // Met la température en "ville invalide"
          setTemperatureMin('Ville invalide'); // Met la température minimale en "ville invalide"
          setTemperatureMax('Ville invalide'); // Met la température maximale en "ville invalide"
          setRessentis('Ville invalide'); // Met la température ressentie en "ville invalide"
          setHumidite('Ville invalide'); // Met l'humidité de l'air en "ville invalide"
          setVent('Ville invalide'); // Met la vitesse du vent en "ville invalide"
        }
  })
}

const handleWeather = (ville) => {
  setText(ville)
  getWeather()
}

useEffect(() => { getWeather(); },[])

return ( // Charge l'app
<ImageBackground source={background} style={imgStyle.background}>
<View style={viewStyle.introView}>

  <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>De quelle ville voulez vous obtenir la météo ?</Text>
        <TextInput placeholder="             Entrez une ville" onChangeText={(ville) => setText(ville)} style={styles.placeholder}/>
        <Pressable style={[styles.button, styles.buttonConfirm]} onPress={() => {getWeather(); setModalVisible(!modalVisible)}}>
          <Text style={styles.textStyle}>Confirmer</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Annuler</Text>
        </Pressable>
      </View>
    </View>
  </Modal>

        <Text style={textStyle.title}>Météo</Text>
        <Text style={textStyle.city}>{ville}</Text>

        <Text style={textStyle.temp}>Température minimale : {temperature_min}</Text>
        <Text style={textStyle.temp}>Température actuelle : {temperature}</Text>
        <Text style={textStyle.temp}>Ressentis : {ressentis}</Text>
        <Text style={textStyle.temp}>Température maximale : {temperature_max}</Text>
        <Text style={textStyle.vent}>Vitesse du vent : {vent}</Text>
        <Text style={textStyle.humidity}>Humidité : {humidite}</Text>

        <Button title="Changer de ville" color="#47B7F7" onPress={() => setModalVisible(true)}/>

    </View>
  </ImageBackground>
  );
};

export default App;
console.log("\n\n---------------------\n\n")