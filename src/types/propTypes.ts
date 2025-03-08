export type Navigation = {
     navigate: (scene: string, params?: Record<string, any>) => void;
   };

export type CustomButtonProps = {
  title: string; 
  onPress: () => void; 
};

export type CustomLinkProps = {
  title: string; 
  onPress: () => void;
};