import JSZip from 'jszip';

export async function generateApkProjectZip(appUrl: string): Promise<Blob> {
  const zip = new JSZip();

  // Root README
  zip.file('README-BUILD-APK.md', `# CSIR NET ChemTracker - Android APK Package

This package allows you to build a standalone, offline Android APK for **CSIR NET Chemical Sciences Tracker**.

## Option 1: Instant 1-Click APK via PWABuilder (No coding required)
1. Visit: https://www.pwabuilder.com/reportcard?url=${encodeURIComponent(appUrl)}
2. Click **Package for Stores** -> Select **Android**.
3. Choose **Download APK / Package**. You will instantly get a signed APK file to install on any Android phone!

## Option 2: Native Android WebAPK (Direct from Android Chrome)
1. Open this app URL in Google Chrome on your Android phone:
   ${appUrl}
2. Tap the **3 dots menu** in Chrome or click the in-app **"Install Android App"** button.
3. Tap **Add to Home screen** or **Install App**.
4. Android's WebAPK minting service builds an official native **.apk** on your device with app drawer icon, offline cache, and native window!

## Option 3: Compile via Android Studio / Gradle
1. Requirements: Android Studio & JDK 17+
2. Open this folder in Android Studio.
3. Run \`./gradlew assembleDebug\` (or in Android Studio: **Build > Build Bundle(s) / APK(s) > Build APK(s)**).
4. The generated APK will be at:
   \`app/build/outputs/apk/debug/app-debug.apk\`
5. Transfer \`app-debug.apk\` to your phone and install!

---
Package: org.csir.chemtracker
App Name: CSIR NET ChemTracker
Min Android SDK: 22 (Android 5.1+)
Target SDK: 34 (Android 14)
`);

  // AndroidManifest.xml
  zip.file('android/app/src/main/AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.csir.chemtracker">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="CSIR NET ChemTracker"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.NoActionBar">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="CSIR NET ChemTracker"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:theme="@android:style/Theme.Material.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`);

  // MainActivity.java (WebView / TWA container)
  zip.file('android/app/src/main/java/org/csir/chemtracker/MainActivity.java', `package org.csir.chemtracker;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView mWebView;

    @Override
    @SuppressLint("SetJavaScriptEnabled")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        mWebView = new WebView(this);
        setContentView(mWebView);

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);

        mWebView.setWebViewClient(new WebViewClient());
        mWebView.loadUrl("${appUrl}");
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
`);

  // build.gradle (app level)
  zip.file('android/app/build.gradle', `apply plugin: 'com.android.application'

android {
    namespace 'org.csir.chemtracker'
    compileSdk 34

    defaultConfig {
        applicationId "org.csir.chemtracker"
        minSdk 22
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
}
`);

  // capacitor.config.json
  zip.file('capacitor.config.json', JSON.stringify({
    appId: 'org.csir.chemtracker',
    appName: 'CSIR NET ChemTracker',
    webDir: 'dist',
    server: {
      url: appUrl,
      cleartext: true
    }
  }, null, 2));

  // TWA (Trusted Web Activity) twa-manifest.json
  zip.file('twa-manifest.json', JSON.stringify({
    packageId: 'org.csir.chemtracker',
    host: new URL(appUrl).host,
    name: 'CSIR NET Chemical Sciences Tracker',
    launcherName: 'ChemTracker',
    themeColor: '#090d16',
    navigationColor: '#090d16',
    backgroundColor: '#090d16',
    startUrl: '/',
    iconUrl: `${appUrl}/pwa-512x512.png`,
    maskableIconUrl: `${appUrl}/pwa-maskable-512x512.png`,
    appVersion: '1.0.0'
  }, null, 2));

  return await zip.generateAsync({ type: 'blob' });
}
