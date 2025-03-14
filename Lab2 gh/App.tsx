import { View } from 'react-native';
import React, { useState } from 'react';
import InputFragment from './components/InputFragment';
import ResultFragment from './components/ResultFragment';

const App = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  return (
    <View style={{ flex: 1 }}>
      {!orderDetails ? 
        <InputFragment onSubmit={setOrderDetails} /> 
        : 
        <ResultFragment 
          orderDetails={orderDetails} 
          onCancel={() => setOrderDetails(null)}
        />
      }
    </View>
  );
};

export default App;