# URL-Based Routing Guide

This application now uses URL-based routing instead of state-based navigation. Each screen has its own URL, making it easier to bookmark, share, and navigate.

## Patient Flow URLs

| URL                                    | Component                | Description                             |
| -------------------------------------- | ------------------------ | --------------------------------------- |
| `/`                                    | WelcomeScreen            | Welcome/landing page                    |
| `/patient-selection`                   | PatientSelection         | Choose between demo patients            |
| `/questionnaire`                       | Questionnaire            | Answer questions about goals            |
| `/analysis`                            | AnalysisScreen           | Analysis loading screen                 |
| `/analysis-results`                    | ThreeSlideAnalysisScreen | Three-slide analysis results            |
| `/analysis-detail?category=<category>` | AnalysisScreen           | Detailed analysis for specific category |
| `/journey`                             | JourneyScreen            | Patient journey visualization           |
| `/value`                               | ValueScreen              | Value proposition screen                |

## Provider Flow URLs

| URL                        | Component               | Description                    |
| -------------------------- | ----------------------- | ------------------------------ |
| `/provider`                | ProviderDashboard       | Provider dashboard             |
| `/provider/patients`       | PatientManagementScreen | Patient management list        |
| `/provider/analysis-tools` | AnalysisToolsScreen     | Analysis tools and utilities   |
| `/provider/patient/[id]`   | PatientDetailScreenV2   | Individual patient detail page |
| `/provider/upload`         | ModalPhotoUpload        | Photo upload for new analysis  |
| `/provider/results`        | ModalAnalysisResults    | Analysis results display       |

## Data Persistence

The application uses `localStorage` to persist data between routes:

- `selectedPatient`: Currently selected patient
- `userPhoto`: User's uploaded photo
- `userAnswers`: Questionnaire responses
- `analysisResult`: Analysis results from Modal API

## Navigation Utilities

### useNavigation Hook

```typescript
import { useNavigation } from "@/lib/navigation";

const {
  navigateToPatientSelection,
  navigateToAnalysis,
  navigateToProviderDashboard,
  goBack,
} = useNavigation();
```

### Data Persistence

```typescript
import { persistData } from "@/lib/navigation";

// Set data
persistData.setSelectedPatient("sydney");
persistData.setUserPhoto("/path/to/photo.jpg");

// Get data
const patient = persistData.getSelectedPatient();
const photo = persistData.getUserPhoto();

// Clear all data
persistData.clearAll();
```

## Navigation Component

A reusable navigation component is available:

```tsx
import { Navigation } from "@/components/Navigation";

<Navigation
  showBackButton={true}
  showHomeButton={false}
  customBackAction={() => router.push("/custom-path")}
/>;
```

## Benefits of URL-Based Routing

1. **Bookmarkable**: Users can bookmark any screen
2. **Shareable**: URLs can be shared with others
3. **Browser Navigation**: Back/forward buttons work correctly
4. **Deep Linking**: Direct access to specific screens
5. **SEO Friendly**: Each screen has its own URL
6. **State Management**: Data persists across page refreshes
7. **Debugging**: Easier to debug specific screens

## Migration Notes

- All state-based navigation has been replaced with `useRouter` from Next.js
- Data persistence uses `localStorage` for client-side storage
- Components now receive navigation handlers as props
- URL parameters are used for dynamic content (e.g., patient ID, category)
