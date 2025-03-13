import React, {useState, useEffect} from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';
import CodePush from '@code-push-next/react-native-code-push';

const App = () => {
  const [updateStatus, setUpdateStatus] = useState('Checking for updates...');
  const [syncStatus, setSyncStatus] = useState(null);
  async function checkForUpdate2() {
    try {
      console.log('🔍 Checking for CodePush update...');
      const update = await CodePush.checkForUpdate();

      if (update) {
        console.log('🚀 Update available:', update);
        console.log('🔹 Description:', update.description);
        console.log('🔹 Mandatory:', update.isMandatory);
        console.log('🔹 Package Hash:', update.packageHash);
        console.log('🔹 Size:', update.packageSize, 'bytes');
      } else {
        console.log('✅ No updates available. App is up to date.');
      }
    } catch (error) {
      console.error('❌ Error checking for update:', error);
    }
  }

  const checkForUpdate = async () => {
    try {
      setUpdateStatus('Checking for updates...');
      let update = await CodePush.checkForUpdate();
      if (update) {
        setUpdateStatus('Update available! Downloading...');
        CodePush.sync(
          {
            installMode: CodePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
          },
          status => {
            setSyncStatus(status);
            switch (status) {
              case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                setUpdateStatus('Checking for update...');
                break;
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                setUpdateStatus('Downloading update...');
                break;
              case CodePush.SyncStatus.INSTALLING_UPDATE:
                setUpdateStatus('Installing update...');
                break;
              case CodePush.SyncStatus.UP_TO_DATE:
                setUpdateStatus('App is up-to-date.');
                break;
              case CodePush.SyncStatus.UPDATE_INSTALLED:
                setUpdateStatus('Update installed! Restarting app...');
                break;
              default:
                setUpdateStatus('Unknown status: ' + status);
                break;
            }
          },
        );
      } else {
        setUpdateStatus('App is up-to-date.');
      }
    } catch (error) {
      setUpdateStatus('Error checking for update: ' + error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CodePush Test Screen</Text>
      <Text>Status: {updateStatus}</Text>
      {syncStatus === CodePush.SyncStatus.DOWNLOADING_PACKAGE && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <Button title="Check for Update" onPress={checkForUpdate} />
      <Button
        title="syncccc CODEPUSH_ANDROID_ĐÃ_ĂN2131231123123213212312"
        onPress={checkForUpdate2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  // deploymentKey: '4z3zDE2CTLqlvq2HdxiprgImvyY84ksvOXqog',
};

export default CodePush(codePushOptions)(App);
