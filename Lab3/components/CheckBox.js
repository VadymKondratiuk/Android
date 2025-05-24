import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CheckBox = ({options, checkedValues, onChange, style}) => {
    let updatedCheckedValues = [...checkedValues];
    return (
        <View style={[styles.container, style]}>
            {options.map((option) => {
                let active = updatedCheckedValues.includes(option.value);
                
                return (
                    <TouchableOpacity 
                        style={
                            active 
                            ? [styles.checkBox, styles.activeCheckBox]
                            : styles.checkBox
                        }
                        onPress = {() => {
                            if (active) {
                                updatedCheckedValues = updatedCheckedValues.filter((value) => value !== option.value);
                                return onChange(updatedCheckedValues);
                            }
                            updatedCheckedValues.push(option.value);
                            onChange(updatedCheckedValues);
                        }}
                        key={option.value}
                    >
                        <MaterialIcons 
                            name={active ? "check-box" : "check-box-outline-blank"}
                            size={24}
                            color={"black"}   
                        />
                        <Text styles={styles.text}>{option.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10,
    },
    checkBox: {
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
    activeCheckBox: {
        backgroundColor: '#E3F2FD', 
        borderColor: '#2196F3',
    },
    text: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
        fontWeight: '300', 
    },
});

export default CheckBox;
