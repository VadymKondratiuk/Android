import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Radio = ({ options, selectedValue, onChange, style }) => {
    return (
        <View style={[styles.container, style]}>
            {options.map((option) => {
                let active = selectedValue === option.value;

                return (
                    <TouchableOpacity 
                        style={active ? [styles.radioButton, styles.activeRadioButton] : styles.radioButton}
                        onPress={() => onChange(option.value)}
                        key={option.value}
                    >
                        <MaterialIcons 
                            name={active ? "radio-button-checked" : "radio-button-unchecked"}
                            size={24}
                            color={active ? "#4CAF50" : "#333"}
                        />
                        <Text style={styles.text}>{option.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );  
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10,
    },
    radioButton: {
        width: '100%',
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333', 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9', 
        marginBottom: 8,
    },
    activeRadioButton: {
        backgroundColor: '#E3F2FD', 
        borderColor: '#2196F3',
    },
    text: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
        fontWeight: '500', 
    },
});

export default Radio;
