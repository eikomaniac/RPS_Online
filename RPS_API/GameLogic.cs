internal static class GameLogic
{
  public static string BeginnerAI(int userId, RpsDb db)
  {
    List<Match> lastTwoMatches = db.MatchHistory
      .Where(x => x.UserId == userId)
      .OrderByDescending(x => x.MatchId)
      .Take(2)
      .ToList();
    List<string> options = new List<string>{"rock", "paper", "scissors"};
    if (lastTwoMatches.Count == 0) // start with paper vs. new user
    {
      return "paper";
    }
    // check opponent made same move twice in a row
    else if (lastTwoMatches.Count == 2 &&
      lastTwoMatches[0].UserOption == lastTwoMatches[1].UserOption
      && (lastTwoMatches[0].Result == "win" && lastTwoMatches[1].Result == "win"))
    {
      int index = options.IndexOf(lastTwoMatches[0].UserOption);
      int responseIndex = (index + 2) % 3;
      return options[responseIndex];
    }
    Match lastMatch = lastTwoMatches[0];
    if (lastMatch.Result == "win" || lastMatch.Result == "loss") {
      // cpu loss -> choose things that beats what opponent played
      //  cpu win -> switch to thing that would beat what you played
      options.Remove(lastMatch.UserOption);
      options.Remove(lastMatch.CPUOption);
      return options[0];
    } else { // draw -> return random
      Random random = new Random();
      return options[random.Next(options.Count)];
    }
  }
  public static string IntermediateAI()
  {
    string[] options = { "rock", "paper", "scissors" };
    Random random = new Random();
    return options[random.Next(options.Length)];
  }

  public static string AdvancedAI(int userId, RpsDb db)
  {
    List<Match> allMatches = db.MatchHistory
    .Where(x => x.UserId == userId)
    .OrderByDescending(x => x.MatchId)
    .Take(25) // take last 25 matches to account for human recency bias
    .ToList();

    // simple regret matching algorithm
    int[] regrets = new int[3]; // regret value for NOT playing option

    // calculate cumulative regrets for each option
    foreach (Match match in allMatches)
    {
      List<string> options = new List<string>{"rock", "paper", "scissors"};
      if (match.Result == "win") // cpu loss
      {
        regrets[GetOptionIndex(match.UserOption)] += 1; // 1 regret for not drawing
        options.Remove(match.CPUOption);
        options.Remove(match.UserOption);
        regrets[GetOptionIndex(options[0])] += 2; // 2 regret for not winning
      } else if (match.Result == "draw")
      {
        regrets[GetOptionIndex(match.CPUOption)] += 1; // 1 regret for not drawing
        regrets[(GetOptionIndex(match.CPUOption) + 1) % 3] += 2; // 2 regret for not winning
      }
    }

    int sum = regrets.Sum();
    if (sum <= 0)
    {
        // if no regrets yet, choose randomly
        var options = new string[] { "rock", "paper", "scissors" };
        return options[new Random().Next(options.Length)];
    }

    // compute the mixed strategy based on regrets
    double[] probs = new double[3];
    for (int i = 0; i < 3; i++)
    {
        probs[i] = Math.Max(regrets[i], 0) / (double)sum;
    }

    // choose a random option based on mixed strategy (probability distribution formed from cumulative regrets)
    double rand = new Random().NextDouble();
    if (rand < probs[0])
    {
        return "rock";
    }
    else if (rand < probs[0] + probs[1])
    {
        return "paper";
    }
    else
    {
        return "scissors";
    }
  }

  public static int GetOptionIndex(string option)
  {
    switch (option)
    {
      case "rock":
        return 0;
      case "paper":
        return 1;
      case "scissors":
        return 2;
      default:
        throw new ArgumentException("Invalid option");
    }
  }

  public static string GetOptionName(int index)
  {
    switch (index)
    {
      case 0:
        return "rock";
      case 1:
        return "paper";
      case 2:
        return "scissors";
      default:
        throw new ArgumentException("Invalid option index");
    }
  }
}
