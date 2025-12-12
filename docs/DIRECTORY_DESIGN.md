```bash
components/
├── camera/
│   ├── CameraView.tsx           # メインのカメラビュー
│   ├── CameraOverlay.tsx        # カメラ上のオーバーレイ要素
│   ├── TiltIndicator.tsx        # 現在の RenderTiltIndicator
│   └── CameraGestureHandler.tsx # 現在の RenderCameraGesture
├── ui/
│   ├── controls/
│   │   ├── TopControlBar.tsx    # 上部のコントロールバー
│   │   ├── BottomControlBar.tsx # 下部のコントロールバー
│   │   ├── ShutterButton.tsx    # 現在の ShutterBtn
│   │   ├── ZoomSelector.tsx     # 現在の ZoomControls
│   │   └── ModeSelector.tsx     # 撮影モード選択
│   ├── tools/
│   │   ├── RatioSelector.tsx    # アスペクト比選択
│   │   ├── GridToggle.tsx       # グリッド表示切り替え
│   │   ├── LevelToggle.tsx      # 水準器表示切り替え
│   │   └── DrawingGridToggle.tsx # 描画グリッド切り替え
│   └── indicators/
│       ├── FaceDetectionOverlay.tsx # 顔検出の円形表示
│       └── GuidelineOverlay.tsx     # ガイドライン表示
├── gallery/
│   ├── GalleryModal.tsx         # 既存
│   ├── FullScreenImage.tsx      # 既存
│   └── Thumbnail.tsx            # 既存
└── layout/
    ├── CameraLayout.tsx         # メインレイアウト
    └── SafeAreaWrapper.tsx      # セーフエリア対応

```
