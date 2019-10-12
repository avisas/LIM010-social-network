export const firebase = () => ({
  storage: () => ({
    ref: () => ({
      child: path => ({
        put: () => new Promise((resolve) => {
          resolve({
            ref: {
              getDownloadURL: () => path,
            },
          });
        }),
      }),
    }),
  }),
});
