using Microsoft.EntityFrameworkCore;

public class RpsDb : DbContext
{
    public RpsDb(DbContextOptions<RpsDb> options)
        : base(options) { }

    public DbSet<Match> MatchHistory => Set<Match>();
}