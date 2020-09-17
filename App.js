import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const Button = ({title, onPress, style}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {
    return (
      <View style={styles.screen}>
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="Go to notifications"
        />
        <Button
          style={{marginTop: 16}}
          onPress={() => this.props.navigation.toggleDrawer()}
          title="Toggle drawer"
        />
      </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render() {
    return (
      <View style={styles.screen}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
        <Button
          style={{marginTop: 16}}
          onPress={() => this.props.navigation.toggleDrawer()}
          title="Toggle drawer"
        />
      </View>
    );
  }
}

const stackRoutes = {
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
};

const CustomDrawerContentComponent = ({navigation}) => {
  const data = Object.keys(stackRoutes);
  const renderItem = ({item, index}) => (
    <Button
      title={item}
      style={{marginTop: 8}}
      onPress={() => {
        // if (
        //   navigation?.state?.routes[0] &&
        //   navigation?.state?.routes[0].routes[0] &&
        //   navigation?.state?.routes[0].routes[0].routeName !== item
        // ) {
        navigation.navigate(item);
        // } else {
        //   navigation.toggleDrawer();
        // }
      }}
    />
  );

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <FlatList
          contentContainerStyle={styles.drawerContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={(key) => key}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

// const Hamburger = ({onPress, style}) => (
//   <TouchableOpacity onPress={onPress} style={style}>
//     <View style={styles.ham} />
//     <View style={styles.ham} />
//     <View style={styles.ham} />
//   </TouchableOpacity>
// );

const Root = createStackNavigator(stackRoutes, {
  mode: 'modal',
  // defaultNavigationOptions: ({navigation}) => ({
  //   headerLeft: () => (
  //     <Hamburger
  //       style={styles.headerLeft}
  //       onPress={() => {
  //         navigation.toggleDrawer();
  //       }}
  //     />
  //   ),
  // }),
});

const MyDrawerNavigator = createDrawerNavigator(
  {
    Root: {
      screen: Root,
    },
  },
  {
    contentComponent: CustomDrawerContentComponent,
  },
);

const MyApp = createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer: {
    paddingTop: 80,
  },
  button: {
    width: 160,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ham: {
    width: 32,
    height: 4,
    backgroundColor: '#000',
    marginVertical: 2,
  },
  headerLeft: {
    marginLeft: 18,
  },
});

export default MyApp;
