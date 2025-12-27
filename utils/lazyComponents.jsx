import { lazy, Suspense } from 'react';
import { LoadingCard } from '@/components/ui/LoadingState';

/**
 * Lazy load component with loading fallback
 * @param {Function} importFunc - Dynamic import function
 * @param {Object} fallbackProps - Props for loading component
 */
export function lazyLoadComponent(importFunc, fallbackProps = {}) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyWrapper(props) {
    const { message = 'Loading component...', ...rest } = fallbackProps;
    
    return (
      <Suspense fallback={<LoadingCard message={message} />}>
        <LazyComponent {...props} {...rest} />
      </Suspense>
    );
  };
}

/**
 * Lazy load with retry mechanism
 */
export function lazyWithRetry(importFunc, retries = 3, interval = 1000) {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      const attemptImport = (attemptsLeft) => {
        importFunc()
          .then(resolve)
          .catch((error) => {
            if (attemptsLeft === 1) {
              reject(error);
              return;
            }
            
            console.warn(`Lazy load failed, retrying... (${attemptsLeft - 1} attempts left)`);
            setTimeout(() => attemptImport(attemptsLeft - 1), interval);
          });
      };
      
      attemptImport(retries);
    });
  });
}

/**
 * Preload a lazy component
 */
export function preloadComponent(importFunc) {
  const component = lazy(importFunc);
  component._init = importFunc;
  return component;
}

// Lazy loaded components for heavy features
export const LazyTSIDashboard = lazyLoadComponent(
  () => import('@/TSIDashboard.jsx'),
  { message: 'Loading Strategic Intelligence Dashboard...' }
);

export const LazyAnalysisReportModal = lazyLoadComponent(
  () => import('@/AnalysisReportModal.jsx'),
  { message: 'Loading analysis report...' }
);

export const LazyGraphVisualization = lazyLoadComponent(
  () => import('@/GraphVisualization.jsx'),
  { message: 'Loading knowledge graph...' }
);

export const LazyAnalysisResults = lazyLoadComponent(
  () => import('@/AnalysisResults.jsx'),
  { message: 'Loading analysis results...' }
);

export const LazyConversationList = lazyLoadComponent(
  () => import('@/ConversationList.jsx'),
  { message: 'Loading conversations...' }
);

export const LazyTechStackVisualization = lazyLoadComponent(
  () => import('@/TechStackVisualization.jsx'),
  { message: 'Loading tech stack visualization...' }
);

export default {
  lazyLoadComponent,
  lazyWithRetry,
  preloadComponent,
  LazyTSIDashboard,
  LazyAnalysisReportModal,
  LazyGraphVisualization,
  LazyAnalysisResults,
  LazyConversationList,
  LazyTechStackVisualization
};
