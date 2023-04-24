document.querySelector('#getButton').addEventListener('click', apiRequest)

async function apiRequest(){
    const playerName = document.querySelector('input').value
    try{
        const response = await fetch(`https://yankees-2022-roster.herokuapp.com/api/${playerName}`)
        const data = await response.json();
        console.log(data);

        if(data.player === 'batter'){
            document.getElementById('playerName').innerText = data.batterName
            document.getElementById('position').innerText = data.position
            document.getElementById('stat1').innerText = 'At Bats: ' + data.atBats
            document.getElementById('stat2').innerText = 'Batting Average: ' + data.battingAverage
            document.getElementById('stat3').innerText = 'On-Base Percentage: ' + data.onBasePercentage
            document.getElementById('stat4').innerText = 'OPS: ' + data.ops
            document.getElementById('stat5').innerText = 'Homeruns: ' + data.homeruns
            document.getElementById('stat6').innerText = 'RBI: ' + data.rbi
    
            document.getElementById('playerImage').src = data.image
            document.getElementById('playerCaption').innerText = data.batterName
        }else if(data.player === 'pitcher'){
            document.getElementById('playerName').innerText = data.pitcherName
            document.getElementById('stat1').innerText = 'Innings Pitched: ' + data.inningsPitched
            document.getElementById('stat2').innerText = 'ERA: ' + data.era
            document.getElementById('stat3').innerText = 'WHIP: ' + data.whip
            document.getElementById('stat4').innerText = 'Strikeouts: ' + data.strikeouts
            document.getElementById('stat5').innerText = 'Wins: ' + data.wins
            document.getElementById('stat6').innerText = 'Losses: ' + data.losses 

    
            document.getElementById('playerImage').src = data.image
            document.getElementById('playerCaption').innerText = data.pitcherName
        }
    } catch(error){
        console.log(error);
    }
}