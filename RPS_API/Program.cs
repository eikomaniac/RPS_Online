using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RpsDb>(opt => opt.UseInMemoryDatabase("RpsDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapGet("/match_history", async (RpsDb db) =>
    await db.MatchHistory.ToListAsync());

//app.MapGet("/todoitems/complete", async (RpsDb db) =>
//    await db.MatchHistory.Where(t => t.IsComplete).ToListAsync());

// app.MapGet("/todoitems/{id}", async (int id, RpsDb db) =>
//     await db.MatchHistory.FindAsync(id)
//         is Match match
//             ? Results.Ok(match)
//             : Results.NotFound());

app.MapPost("/play", async (Match match, RpsDb db) =>
{
    string[] allowedCPUDifficulties = { "beginner", "intermediate", "advanced" };
    if (!allowedCPUDifficulties.Contains(match.CPUDifficulty))
    {
        throw new Exception("Invalid CPU difficulty. Must be 'beginner', 'intermediate', or 'advanced'");
    }

    string[] allowedOptions = { "rock", "paper", "scissors" };
    if (!allowedOptions.Contains(match.UserOption) || !allowedOptions.Contains(match.CPUOption)) {
        throw new Exception("Invalid option");
    }

    // Determine result via numerical representation (possible to cyclical nature of RPS)
    int userOptionIdx = Array.IndexOf(allowedOptions, match.UserOption);
    int cpuOptionIdx = Array.IndexOf(allowedOptions, match.CPUOption);

    int diff = (userOptionIdx - cpuOptionIdx + 3) % 3;

    string result = diff switch
    {
        0 => "draw",
        1 => "loss",
        2 => "win",
        _ => throw new InvalidOperationException("Invalid input values")
    };
    if (match.Result != result)
    {
        throw new Exception("Invalid game result");
    }

    db.MatchHistory.Add(match);
    await db.SaveChangesAsync();

    return Results.Created($"/match/{match.Id}", match);
});

app.MapDelete("/todoitems/{id}", async (int id, RpsDb db) =>
{
    if (await db.MatchHistory.FindAsync(id) is Match match)
    {
        db.MatchHistory.Remove(match);
        await db.SaveChangesAsync();
        return Results.Ok(match);
    }

    return Results.NotFound();
});

app.Run();