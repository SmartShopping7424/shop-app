const awsconfig = {
  dev: {
    Auth: {
      userPoolId: "ap-south-1_5rQilOCdL",
      userPoolWebClientId: "5f37i9l2nkp1hjrqkhvl3p2ukk",
      identityPoolId: "ap-south-1:75109f97-4c5c-4cbf-887e-a7fe94211f23",
      region: "ap-south-1",
      authenticationFlowType: "CUSTOM_AUTH",
    },
    API: {
      endpoints: [
        {
          name: "baseurl",
          endpoint:
            "https://81grr8mzo7.execute-api.ap-south-1.amazonaws.com/dev",
          region: "ap-south-1",
        },
      ],
    },
  },
  prod: {
    Auth: {
      userPoolId: "ap-south-1_Iu3o76W5K",
      userPoolWebClientId: "13uttg4rn177qm3jlmi6i7r5np",
      identityPoolId: "ap-south-1:2bb47c8a-5893-49be-a803-ff195441ac30",
      region: "ap-south-1",
      authenticationFlowType: "CUSTOM_AUTH",
    },
    API: {
      endpoints: [
        {
          name: "baseurl",
          endpoint:
            "https://t8fthcn34b.execute-api.ap-south-1.amazonaws.com/prod",
          region: "ap-south-1",
        },
      ],
    },
  },
};

export default awsconfig;
