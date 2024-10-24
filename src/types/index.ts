type ReqRequest = {
  type: 'reg';
  data: string;
  id: 0;
};

type UserData = {
  name: string;
  password: string;
};

type registeredUser = {
  name: string;
  index: string;
  error?: boolean;
  errorText?: string;
};

export { ReqRequest, UserData, registeredUser };
