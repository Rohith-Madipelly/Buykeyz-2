export const scrollToTop = (scrollViewRef) => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  export const scrollToTopY = (scrollViewRef,y) => {
    scrollViewRef.current?.scrollTo({ y: y, animated: true });
  };
