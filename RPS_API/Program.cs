using Microsoft.EntityFrameworkCore;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RpsDb>(opt => opt.UseInMemoryDatabase("RpsDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
            policy  =>
            {
              policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader();
            });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapPost("/play", async (UserInput userInput, RpsDb db) =>
{
  string[] allowedOptions = { "rock", "paper", "scissors" };
  if (!allowedOptions.Contains(userInput.UserOption)) {
    throw new Exception("Invalid user option");
  }

  string cpuOption = "";
  switch (userInput.CPUDifficulty)
  {
    case "beginner":
      cpuOption = GameLogic.BeginnerAI(userInput.UserId, db);
      break;
    case "intermediate":
      cpuOption = GameLogic.IntermediateAI();
      break;
    case "advanced":
      cpuOption = GameLogic.AdvancedAI(userInput.UserId, db);
      break;
    default:
      throw new ArgumentException("Invalid CPU difficulty. Must be 'beginner', 'intermediate', or 'advanced'");
  }

  // Determine result via numerical representation (possible to cyclical nature of RPS)
  int userOptionIdx = GameLogic.GetOptionIndex(userInput.UserOption);
  int cpuOptionIdx = GameLogic.GetOptionIndex(cpuOption);

  int diff = (userOptionIdx - cpuOptionIdx + 3) % 3;

  string result = diff switch {
    0 => "draw",
    1 => "win",
    2 => "loss",
    _ => throw new InvalidOperationException("Unknown error occurred")
  };

  Match match = new Match
  {
    UserId = userInput.UserId,
    CPUDifficulty = userInput.CPUDifficulty,
    UserOption = userInput.UserOption,
    CPUOption = cpuOption,
    Result = result
  };

  db.MatchHistory.Add(match);
  await db.SaveChangesAsync();

  return Results.Created($"/match/{match.MatchId}", match);
});

app.MapGet("/stats/{userId}", async (int userId, RpsDb db) =>
{
  List<Match> beginnerMatches = await db.MatchHistory
    .Where(x => x.UserId == userId && x.CPUDifficulty == "beginner")
    .ToListAsync();

  DifficultyStats beginnerStats = new DifficultyStats(beginnerMatches);

  List<Match> intermediateMatches = await db.MatchHistory
    .Where(x => x.UserId == userId && x.CPUDifficulty == "intermediate")
    .ToListAsync();
  DifficultyStats intermediateStats = new DifficultyStats(intermediateMatches);

  List<Match> advancedMatches = await db.MatchHistory
    .Where(x => x.UserId == userId && x.CPUDifficulty == "advanced")
    .ToListAsync();
  DifficultyStats advancedStats = new DifficultyStats(advancedMatches);

  Stats stats = new Stats
  {
    BeginnerStats = beginnerStats,
    IntermediateStats = intermediateStats,
    AdvancedStats = advancedStats,
    MatchHistory = await db.MatchHistory
      .Where(x => x.UserId == userId)
      .OrderByDescending(x => x.MatchId)
      .ToListAsync()
  };

  return stats;
});

app.Run();