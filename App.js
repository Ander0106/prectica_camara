import { StatusBar } from 'expo-status-bar';

import React, { useState, useRef, useEffect  } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert, TouchableOpacity} from 'react-native';

import imagenFoto from './assets/tomaf.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing';

export default function App() {

  const [image, setImage] = useState(null);
   // Función para abrir la cámara y capturar una foto
   const openCamera = async () => {
    // Solicitar permisos
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos requeridos",
        "Se necesita acceso a la cámara para tomar fotos."
      );
      return;
    }

    // Abrir la cámara
    const result = await ImagePicker.launchCameraAsync({
    
    //  allowsEditing: true, // Permite recortar la foto (opcional)
      quality: 1, // Calidad máxima
      
    });

    console.log(result);

    if (!result.canceled) {
      // Guardar la URI de la imagen
      setImage(result.assets[0].uri);
  
    }
  };

  const compartirArchivos = async()=>{
    if(!(await Sharing.isAvailableAsync())){
      alert('No se pude compartir en tu dispositivo');
      return;
    }
    
   await Sharing.shareAsync(image);
  }

  // {image ==! null ? 
  //   <Image style={styles.imagenConfi} source={{uri: image}}></Image>:
  //   <Image style={styles.imagenConfi} source={imagenFoto}></Image>
  //{image && <Image source={{ uri: image }} style={styles.imagenConfi} />}
      
  // }

 
  return (
    <View style={styles.container}>
      <Text style={styles.textTitulo}>Comparto mi Foto</Text>
    
      {image ? <Image source={{ uri: image }} style={styles.imagenConfi} />:
       <Image style={styles.imagenConfi} source={imagenFoto}></Image> }
      
      <TouchableOpacity style={styles.btnconfif} onPress={openCamera}>
        <Text>Tomar FOTO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnconfif1} onPress={compartirArchivos}>
        <Text>Compartir</Text>
      </TouchableOpacity>
  
     </View>
  );
}
const showAlert = () => {
  Alert.alert(
    '¡Alerta!', // Título de la alerta
    'Este es el mensaje de la alerta.', // Mensaje de la alerta
    [
      { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('OK presionado') },
    ]
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff1cd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitulo:{
    padding: 20,
    fontSize: 30,
    color: 'red',
  },
  imagenConfi:{
    width: 200,
    height: 200,
    marginBottom: 30
  },
  btnconfif:{
    padding: 20,
    backgroundColor: 'orange',
    borderRadius: 10
  },
  btnconfif1:{
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10
  }
});
