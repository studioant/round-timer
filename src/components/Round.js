const Round = ({ round }) => {
  return (
    <div className="round">
        {round < 10 ? (<div>0{round}</div>) : (<div>{round}</div>)}
    </div>
  )
}

export default Round