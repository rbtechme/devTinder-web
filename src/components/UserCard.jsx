const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img className="rounded-e-full h-64" src={photoUrl} alt="User" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age}, {gender}
        </p>

        <p className="text-justify mt-5 mb-5">{about}</p>
        <div className="card-actions justify-between">
          <button className="btn bg-red-500 text-white hover:bg-red-300">
            ignore
          </button>
          <button className="btn bg-green-500 text-white hover:bg-green-300">
            interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
