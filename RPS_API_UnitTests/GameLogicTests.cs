using static GameLogic;

namespace RPS_API_UnitTests
{
    [TestFixture]
    public class GameLogicTests
    {
        private RpsDb _db;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<RpsDb>()
                .UseInMemoryDatabase(databaseName: "RpsDb")
                .Options;

            _db = new RpsDb(options);
        }

        [Test]
        public void BeginnerAI_ReturnsPaperForNewUser()
        {
            var userId = 1;

            var result = BeginnerAI(userId, _db);

            Assert.That(result, Is.EquivalentTo("paper"));
        }

        [Test]
        public void BeginnerAI_ReturnsCorrectResponseToSameMoves()
        {
            var userId = 1;
            var match1 = new Match { UserId = userId, UserOption = "rock", Result = "win" };
            var match2 = new Match { UserId = userId, UserOption = "rock", Result = "win" };
            _db.MatchHistory.Add(match1);
            _db.MatchHistory.Add(match2);

            var result = BeginnerAI(userId, _db);

            Assert.That(result, Is.EquivalentTo("paper"));
        }

        [Test]
        public void IntermediateAI_ReturnsValidOption()
        {
            var result = IntermediateAI();

            var validOptions = new List<string> { "rock", "paper", "scissors" };
            Assert.That(validOptions.Contains(result), Is.True);
        }

        [Test]
        public void AdvancedAI_ReturnsValidOption()
        {
            var userId = 1;
            var match1 = new Match { UserId = userId, UserOption = "rock", CPUOption = "scissors", Result = "win" };
            var match2 = new Match { UserId = userId, UserOption = "rock", CPUOption = "paper", Result = "draw" };
            _db.MatchHistory.Add(match1);
            _db.MatchHistory.Add(match2);

            var result = AdvancedAI(userId, _db);

            var validOptions = new List<string> { "rock", "paper", "scissors" };
            Assert.That(validOptions.Contains(result), Is.True);
        }

        [Test]
        public void determineResult_ReturnsCorrectResult()
        {
            var userInput = "rock";
            var cpuOption = "scissors";

            var result = determineResult(userInput, cpuOption);

            Assert.That(result, Is.EquivalentTo("win"));
        }

        [Test]
        public void GetOptionIndex_ReturnsCorrectIndex()
        {
            var option = "paper";

            var result = GetOptionIndex(option);

            Assert.That(result, Is.EqualTo(1));
        }

        [Test]
        public void GetOptionName_ReturnsCorrectName()
        {
            var index = 2;

            var result = GetOptionName(index);

            Assert.That(result, Is.EquivalentTo("scissors"));
        }

        [TearDown]
        public void TearDown()
        {
            _db.Dispose();
        }
    }
}
