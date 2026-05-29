import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const GlacierTrailsIcadventrelay = ({
  children,
  bounce = true,
}: {
  children: React.ReactNode;
  wudlanndvildexplorrlayScroll?: boolean;
  bounce?: boolean;
}) => {
  return (
    <View style={styles.wudlanndvildexplorrlayBackground}>
      <ScrollView
        bounces={bounce}
        contentContainerStyle={styles.wudlanndvildexplorrlayScrollContent}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wudlanndvildexplorrlayBackground: {
    flex: 1,
    backgroundColor: '#144881',
  },
  wudlanndvildexplorrlayScrollContent: {
    flexGrow: 1,
  },
  wudlanndvildexplorrlayFill: {
    flex: 1,
  },
});

export default GlacierTrailsIcadventrelay;
