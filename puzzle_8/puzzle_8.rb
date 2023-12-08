file_lines = File.readlines('puzzle_8/input.txt', chomp: true)

@instructions = file_lines[0].gsub('L', '0').gsub('R','1').split('')

@map_hash = {}

file_lines[2..-1].each do |line|
  p line
  @map_hash[line[0..2]] = [line[7..9],line[12..14]]
end

p @instructions

@element = "AAA"
@count = 0

def follow_instructions
  @instructions.each do |step|
    @element = @map_hash[@element][step.to_i]
    @count += 1
  end
  
end

while @element != "ZZZ" do
  follow_instructions
end

p @element
p @count