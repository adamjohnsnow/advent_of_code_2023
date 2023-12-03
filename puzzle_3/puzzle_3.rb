@file = File.readlines('./puzzle_input_3.txt', chomp: true)

def parse_line(line)
  numbers = []
  line.scan(/\d+/) do |match|
    numbers << { number: match, index: Regexp.last_match.begin(0) }
  end
  
  numbers
end

def check_part(index_y, index_x, length)
  neighbours = []
  left_edge = index_x == 0 ? 0 : index_x -1
  
  neighbours << @file[index_y - 1][left_edge .. index_x + length] if index_y > 0
  neighbours << @file[index_y][index_x - 1] if index_x > 0
  neighbours << @file[index_y][index_x + length] if index_x + length < @file[index_y].length
  neighbours << @file[index_y + 1][left_edge .. index_x + length] if @file.length > index_y + 1

  !!neighbours.join()[/[^.a-zA-Z0-9\s]/]
end

sum = 0

@file.each_with_index do |line, index|
  results = parse_line(line)
  results.each do |result|
    sum += result[:number].to_i if check_part(index, result[:index], result[:number].length)
  end
end

p sum