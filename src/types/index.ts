type ReqRequest = {
  type: 'reg' | 'create_room' | 'add_user_to_room';
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

type AddToRoomData = {
  indexRoom: string;
};

export { ReqRequest, UserData, registeredUser, AddToRoomData };
