import { ScrollView, Text, View, Alert } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import Ingredient from "@/components/Ingredient/Ingredient";
import { useState } from "react";
import Selected from "@/components/Selected/Selected";

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleSelect(name: string) {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([ ...selected, name ]);
    }
  }

  function handleClearSelected() {
    Alert.alert('Limpar', 'Deseja limpar a seleção?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => setSelected([])}
    ]);
  }

  function handleSearch() {
    router.navigate('/recipes');
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>
        Esolha {"\n"}
        <Text style={ styles.subtitle } >os produtos</Text>
      </Text>

      <Text style={ styles.message }>
        Descubra receitas baseadas nos ingredientes que você escolheu.
      </Text>

      <ScrollView 
        contentContainerStyle={ styles.ingredients } 
        showsVerticalScrollIndicator={false}
      >
        {
          Array.from({ length: 10 }).map((_, index) => (
            <Ingredient 
              key={ index } 
              name="Maçã"
              image="@/assets/apple.png"
              selected={selected.includes(String(index))}
              onPress={ () => handleSelect(String(index)) }
            />
          ))
        }
      </ScrollView>
      {
        selected.length > 0 && (
          <Selected 
            quantity={selected.length} 
            onClear={handleClearSelected} 
            onSearch={handleSearch}
          />)
      }
    </View>
  )
}